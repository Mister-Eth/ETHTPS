using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Models.DataUpdater;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hangfire;
using ETHTPS.Services.BlockchainServices.Extensions;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;

namespace ETHTPS.Services.BlockchainServices.Status
{
    public class HistoricalInfluxLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        private readonly IInfluxWrapper _influxWrapper;
        private readonly ITimeBucketDataUpdaterService<T>? _timeBucketService;

        private int DELAY = 15*1000;
        public HistoricalInfluxLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IInfluxWrapper influxWrapper, IDataUpdaterStatusService statusService, ITimeBucketDataUpdaterService<T> timeBucketService = null) : base(instance, logger, context, statusService, UpdaterType.Historical)
        {
            _influxWrapper = influxWrapper;
            _timeBucketService = timeBucketService;
        }

        protected override string ServiceName { get => $"HistoricalInfluxLogger<{typeof(T).Name}>"; }

        private static bool _instanceRunning = false;
        private static object _lockObj = new object();
        [DisableConcurrentExecution(60 * 60 * 24 * 365)]
        public override async Task RunAsync()
        {
            lock (_lockObj)
            {
                if (!_instanceRunning)
                {
                    _instanceRunning = true;
                }
                else
                {
                    return;
                }
            }
            if (!_context.OldestLoggedHistoricalEntries.Any(x => x.Network == _mainnetID && x.Provider == _providerID))
            {
                _context.OldestLoggedHistoricalEntries.Add(new OldestLoggedHistoricalEntry()
                {
                    Network = _mainnetID,
                    Provider = _providerID,
                    OldestBlock = (await _instance.GetLatestBlockInfoAsync()).BlockNumber
                });
                await _context.SaveChangesAsync();
            }
            var oldestEntry = _context.OldestLoggedHistoricalEntries.First(x => x.Network == _mainnetID && x.ProviderNavigation.Name == _provider);
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

                    _statusService.MarkAsRunning();
                    var block = await _instance.GetBlockInfoAsync(oldestEntry.OldestBlock);
                    if (block == null)
                    {
                        _logger.LogInformation($"{ServiceName} - Null block @{block.BlockNumber}");
                        await Task.Delay(DELAY);
                        continue;
                    }
                    block.Provider = _provider;
                    await _influxWrapper.LogBlockAsync(block);
                    if (_timeBucketService != null)
                    {
                        try
                        {
                            var delta = await CalculateTPSGPSAsync(block);
                            _timeBucketService?.UpdateAllEntries(delta);

                        }
                        catch (Exception e)
                        {
                            _logger.LogError($"{ServiceName} Error logging to MSSQL", e);
                        }
                    }
                    stopwatch.Stop();
                    var eta = TimeSpan.FromMilliseconds(oldestEntry.OldestBlock * (stopwatch.Elapsed.TotalMilliseconds + 350) / step);
                    _logger.LogInformation($"{ServiceName} - Logged block #{block.BlockNumber} ETA: {eta.Days}d {eta.Hours}h {eta.Minutes}m");


                    oldestEntry.OldestBlock -= step;
                    oldestEntry.OldestBlockDate = block.Date;
                    await _context.SaveChangesAsync(); //no gaps
                }
                catch (Exception e)
                {
                    _logger.LogError($"HangfireHistoricalBlockInfoProviderDataLogger: {e.GetType().ToString()}", e.ToString());
                }
                await Task.Delay(DELAY);
            }
        }
    }
}
