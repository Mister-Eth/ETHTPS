using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices.Extensions;
using ETHTPS.Services.HistoricalDataLoggers.Aggregation;
using ETHTPS.Services.HistoricalDataLoggers.ChartLoggers;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class HangfireBlockInfoProviderDataLogger<T> : HangfireBackgroundService
        where T : IBlockInfoProvider
    {
        private readonly T _instance;
        private readonly string _provider;
        private readonly int _providerID;
        private readonly AggregatedDataLogger _aggregatedChartLogger;

        public HangfireBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, ETHTPSContext context, AggregatedDataLogger aggregatedChartLogger) : base(logger, context)
        {
            _instance = instance;
            _aggregatedChartLogger = aggregatedChartLogger;
            _provider = _instance.GetProviderName();
            _providerID = _context.Providers.First(x => x.Name == _provider).Id;
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                var delta = await CalculateTPSGPSAsync();
                _aggregatedChartLogger.AddOrUpdateEntry(delta, _providerID);
                await _context.SaveChangesAsync();

                _logger.LogDebug($"{_provider}: {delta.TPS}TPS {delta.GPS}GPS");
            }
            catch (Exception e)
            {
                _logger.LogDebug("TPSDataUpdaterBase", e);
                throw;
            }
        }

        private async Task<TPSGPSInfo> CalculateTPSGPSAsync()
        {
            var latestBlock = await _instance.GetLatestBlockInfoAsync();
            if (_instance.BlockTimeSeconds > 0)
            {
                return new TPSGPSInfo()
                {
                    BlockNumber = latestBlock.BlockNumber,
                    Date = latestBlock.Date,
                    GPS = latestBlock.GasUsed / _instance.BlockTimeSeconds,
                    TPS = latestBlock.TransactionCount / _instance.BlockTimeSeconds
                };
            }
            else //Add up all blocks submitted at the same time
            {
                var result = new TPSGPSInfo() 
                {
                    Date = latestBlock.Date
                };
                BlockInfo secondToLatestBlock;
                int count = 0;
                do
                {
                    result.TPS += latestBlock.TransactionCount;
                    result.GPS += latestBlock.GasUsed;

                    secondToLatestBlock = await _instance.GetBlockInfoAsync(latestBlock.BlockNumber - 1);
                    if (secondToLatestBlock.Date.Subtract(latestBlock.Date).TotalSeconds != 0)
                    {
                        result.TPS /= Math.Abs(secondToLatestBlock.Date.Subtract(result.Date).TotalSeconds);
                        result.GPS /= Math.Abs(secondToLatestBlock.Date.Subtract(result.Date).TotalSeconds);
                        break;
                    }
                    latestBlock = secondToLatestBlock;
                    await Task.Delay(200);
                    if (++count == 100)
                    {
                        throw new Exception($"Possible infinite loop {(typeof(T))}");
                    }
                }
                while (true);
                return result;
            }
        }
    }
}
