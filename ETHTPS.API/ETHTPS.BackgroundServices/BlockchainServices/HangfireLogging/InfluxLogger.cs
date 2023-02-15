using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices;
using ETHTPS.Services.BlockchainServices.Extensions;
using ETHTPS.Data.Core.Models.DataEntries;

using Hangfire;

using Microsoft.Extensions.Logging;

using System.Threading.Tasks;
using System;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Core.Models.DataUpdater;
using System.Collections.Generic;
using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core.Models.DataEntries.BlockchainServices.Models;

namespace ETHTPS.Services.BlockchainServices.HangfireLogging
{
    public class InfluxLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        private static IBucketCreator _bucketCreator;
        private static object _lockObj = new object();
        private static Dictionary<string, int> _lastBlockNumberDictionary = new();
        private readonly IInfluxWrapper _influxWrapper;
        protected override string ServiceName { get => $"InfluxLogger<{typeof(T).Name}>"; }
        public InfluxLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IInfluxWrapper influxWrapper, IDataUpdaterStatusService statusService) : base(instance, logger, context, statusService, UpdaterType.BlockInfo)
        {
            _influxWrapper = influxWrapper;
            _bucketCreator ??= new MeasurementBucketCreator(influxWrapper);
        }

        [AutomaticRetry(Attempts = 3, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        //        [DisableConcurrentExecution(15)]
        public override async Task RunAsync()
        {
            if (TimeSinceLastRan?.TotalSeconds >= 5)
            {
                try
                {
                    await CreateBucketsIfNeededAsync();

                    _statusService.MarkAsRunning();
                    var block = await _instance.GetLatestBlockInfoAsync();
                    if (block != null)
                    {
                        block.Provider = _provider;
                        if (ShouldSkipBlock(block))
                        {
                            _logger.LogInformation($"Skipping {ServiceName} run because block {block} was already logged");
                            _statusService.MarkAsRanSuccessfully();
                            return;
                        }
                        await _influxWrapper.LogBlockAsync(block);
                        TPSGPSInfo delta = await CalculateTPSGPSAsync(block);
                        _statusService.MarkAsRanSuccessfully();
                    }
                    else
                    {
                        _logger.LogError($"{ServiceName}: no data returned");
                        _statusService.MarkAsFailed();
                    }
                }
                catch (InfluxException e)
                {
                    _statusService.MarkAsFailed();
                    _logger.LogError("InfluxLogger exception", e);
                    throw;
                }
                catch (Exception e)
                {
                    _statusService.MarkAsFailed();
                    _logger.LogError($":{ServiceName} {e.GetType().Name} {e.Message}");
                }
            }
            else
            {
                _logger.LogTrace($"Skipping {ServiceName} run because it was reran too quickly");
            }
        }
        private static bool ShouldSkipBlock(Block blockInfo) => ShouldSkipBlock(blockInfo.Provider, blockInfo.BlockNumber);
        private static bool ShouldSkipBlock(string provider, int block)
        {
            lock (_lockObj)
            {
                if (!_lastBlockNumberDictionary.ContainsKey(provider))
                {
                    _lastBlockNumberDictionary.Add(provider, block);
                    return false;
                }
                if (_lastBlockNumberDictionary[provider] == block)
                    return true;
                _lastBlockNumberDictionary[provider] = block;
                return false;
            }
        }

        private static async Task CreateBucketsIfNeededAsync()
        {
            if (!_bucketCreator.Created)
            {
                await _bucketCreator.CreateBucketsAsync();
            }
        }
    }
}
