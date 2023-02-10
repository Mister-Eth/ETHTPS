using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices;
using ETHTPS.Services.BlockchainServices.Extensions;
using ETHTPS.Services.BlockchainServices.Models;

using Hangfire;

using Microsoft.Extensions.Logging;

using System.Threading.Tasks;
using System;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Models.DataUpdater;

namespace ETHTPS.Services.BlockchainServices
{
    public class InfluxLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        private static IBucketCreator _bucketCreator;
        private readonly IInfluxWrapper _influxWrapper;
        protected override string ServiceName { get => $"InfluxLogger<{typeof(T).Name}>"; }
        public InfluxLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IInfluxWrapper influxWrapper, IDataUpdaterStatusService statusService) : base(instance, logger, context, statusService, UpdaterType.BlockInfo)
        {
            _influxWrapper = influxWrapper;
            _bucketCreator ??= new MeasurementBucketCreator(influxWrapper);
        }

        [AutomaticRetry(Attempts = 3, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
           if (TimeSinceLastRan?.TotalSeconds >= 5)
            {
                try
                {
                    await CreateBucketsIfNeededAsync();

                    _statusService.MarkAsRunning();
                    var block = await _instance.GetLatestBlockInfoAsync();
                    _statusService.MarkAsRanSuccessfully();
                    block.Provider = _provider;
                    await _influxWrapper.LogBlockAsync(block);
                    TPSGPSInfo delta = await CalculateTPSGPSAsync(block);

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
                _logger.LogInformation($"Skipping {ServiceName} run because it was reran too quickly");
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
