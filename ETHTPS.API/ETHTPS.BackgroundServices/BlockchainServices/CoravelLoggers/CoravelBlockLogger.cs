using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.ProviderSpecific;
using ETHTPS.Data.Core;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices;
using ETHTPS.Services.BlockchainServices.Extensions;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.CoravelLoggers
{
    public class CoravelBlockLogger<T> : ICoravelBackgroundService
        where T : IBlockInfoProvider
    {
        private static Dictionary<string, int> _lastBlockNumberDictionary = new();
        private static IBucketCreator _bucketCreator;
        private static object _lockObj = new object();

        private readonly ILogger<CoravelBlockLogger<T>> _logger;
        private readonly IProviderTypeDataUpdaterStatusService _statusService;
        private readonly T _instance;
        private readonly string _providerName;
        private readonly IInfluxWrapper _influxWrapper;
        private string _serviceName => $"CoravelBlockLogger<{typeof(T).Name}>";
        private string Format(string source) => $"{DateTime.Now.ToShortTimeString()} | {_serviceName} : {source}";

        public CoravelBlockLogger(ILogger<CoravelBlockLogger<T>> logger, IDataUpdaterStatusService statusService, T instance, IInfluxWrapper influxWrapper)
        {
            _providerName = instance.GetProviderName();
            _logger = logger;
            _statusService = statusService.MakeProviderSpecific(_providerName).MakeUpdaterSpecific(Data.Models.DataUpdater.UpdaterType.BlockInfo);
            _instance = instance;
            _influxWrapper = influxWrapper;
            _bucketCreator ??= new MeasurementBucketCreator(influxWrapper);
        }

        public async Task Invoke()
        {
            try
            {
                _logger.LogTrace(Format("Running"));
                _statusService.MarkAsRunning();

                await CreateBucketsIfNeededAsync();
                var block = await _instance.GetLatestBlockInfoAsync();
                if (block != null)
                {
                    block.Provider = _providerName;
                    if (ShouldSkipBlock(block))
                    {
                        _logger.LogInformation($"Skipping {_serviceName} run because block #{block.BlockNumber} was already logged");
                        _statusService.MarkAsRanSuccessfully();
                        return;
                    }
                    await _influxWrapper.LogBlockAsync(block);

                    _statusService.MarkAsRanSuccessfully();
                }
                else
                {
                    _logger.LogError($"{_serviceName}: no data returned");
                    _statusService.MarkAsFailed();
                }

                _logger.LogTrace(Format("Success"));
                _statusService.MarkAsRanSuccessfully();
            }
            catch (Exception e)
            {
                _logger.LogError(Format("Failed"), e);
                _statusService.MarkAsFailed();
            }
        }

        private static bool ShouldSkipBlock(IBlock blockInfo) => ShouldSkipBlock(blockInfo.Provider, blockInfo.BlockNumber);
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
