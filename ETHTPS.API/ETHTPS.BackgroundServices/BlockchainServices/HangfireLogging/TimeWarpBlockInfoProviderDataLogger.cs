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
    public class TimeWarpBlockInfoProviderDataLogger<T> : MSSQLLogger<T>
        where T : IBlockInfoProvider
    {
        public TimeWarpBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IDataUpdaterStatusService statusService, ITimeBucketDataUpdaterService<T> timeBucketService) : base(instance, logger, context, statusService, timeBucketService)
        {

        }

        [AutomaticRetry(Attempts = 10, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            if (!_context.OldestLoggedTimeWarpBlocks.Any(x => x.Network == 1 && x.Provider == _providerID))
            {
                _context.OldestLoggedTimeWarpBlocks.Add(new OldestLoggedTimeWarpBlock()
                {
                    Network = 1,
                    Provider = _providerID,
                    OldestBlock = (await _instance.GetLatestBlockInfoAsync()).BlockNumber
                });
            }
            await _context.SaveChangesAsync();
            var oldestEntry = _context.OldestLoggedTimeWarpBlocks.First(x => x.Network == 1 && x.Provider == _providerID);

            while (oldestEntry.OldestBlock < (await _instance.GetLatestBlockInfoAsync()).BlockNumber)
            {
                try
                {
                    var stopwatch = new System.Diagnostics.Stopwatch();
                    stopwatch.Start();

                    var delta = await CalculateTPSGPSAsync(oldestEntry.OldestBlock);
                    _timeBucketService.UpdateMaxEntry(delta);
                    _context.TimeWarpData.Add(new TimeWarpDatum()
                    {
                        AverageGps = delta.GPS,
                        AverageTps = delta.TPS,
                        Block = delta.BlockNumber,
                        StartDate = delta.Date,
                        Network = 1,
                        Provider = _providerID
                    });

                    stopwatch.Stop();
                    var eta = TimeSpan.FromMilliseconds(oldestEntry.OldestBlock * (stopwatch.Elapsed.TotalMilliseconds + 1000));
                    _logger.LogInformation($"{_provider} [{oldestEntry.OldestBlock}] @{delta.Date} ETA: [{eta}] {delta.TPS}TPS {delta.GPS}GPS");
                    await Task.Delay(1000);
                }
                catch (Exception e)
                {
                    _logger.LogDebug("HangfireHistoricalBlockInfoProviderDataLogger", e);
                }
                finally
                {
                    oldestEntry.OldestBlock++;
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
