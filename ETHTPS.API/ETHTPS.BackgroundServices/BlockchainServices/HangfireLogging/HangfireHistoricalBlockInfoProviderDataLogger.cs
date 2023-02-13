using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.Data.Integrations.MSSQL;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.HangfireLogging
{
    public class HangfireHistoricalBlockInfoProviderDataLogger<T> : MSSQLLogger<T>
        where T : IBlockInfoProvider
    {
        public HangfireHistoricalBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IDataUpdaterStatusService statusService, ITimeBucketDataUpdaterService<T> timeBucketService) : base(instance, logger, context, statusService, timeBucketService)
        {
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            if (!_context.OldestLoggedHistoricalEntries.Any(x => x.Network == 1 && x.ProviderNavigation.Name == _provider))
            {
                _context.OldestLoggedHistoricalEntries.Add(new OldestLoggedHistoricalEntry()
                {
                    Network = 1,
                    Provider = _providerID,
                    OldestBlock = (await _instance.GetLatestBlockInfoAsync()).BlockNumber
                });
            }
            await _context.SaveChangesAsync();
            var oldestEntry = _context.OldestLoggedHistoricalEntries.First(x => x.Network == 1 && x.ProviderNavigation.Name == _provider);
            var step = 1;

            if (_context.Providers.Any(x => x.Id == _providerID && x.HistoricalAggregationDeltaBlock.HasValue))
            {
                step = _context.Providers.First(x => x.Id == _providerID).HistoricalAggregationDeltaBlock.Value;
            }

            while (oldestEntry.OldestBlock > 0)
            {
                try
                {
                    var stopwatch = new System.Diagnostics.Stopwatch();
                    stopwatch.Start();

                    var delta = await CalculateTPSGPSAsync(oldestEntry.OldestBlock);
                    _timeBucketService.UpdateAllEntries(delta);
                    stopwatch.Stop();
                    var eta = TimeSpan.FromMilliseconds(oldestEntry.OldestBlock * (stopwatch.Elapsed.TotalMilliseconds + 350) / step);
                    _logger.LogInformation($"{_provider} [{oldestEntry.OldestBlock}] @{delta.Date} ETA: [{eta}] {delta.TPS}TPS {delta.GPS}GPS");
                    await Task.Delay(350);
                }
                catch (Exception e)
                {
                    _logger.LogDebug("HangfireHistoricalBlockInfoProviderDataLogger", e);
                }
                finally
                {
                    oldestEntry.OldestBlock -= step;
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
