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

namespace ETHTPS.Services.BlockchainServices
{
    public class InfluxLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        private static IProviderBucketCreator _bucketCreator;
        private readonly IInfluxWrapper _influxWrapper;

        public InfluxLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IInfluxWrapper influxWrapper, IDataUpdaterStatusService statusService) : base(instance, logger, context, statusService, UpdaterType.BlockInfo)
        {
            _influxWrapper = influxWrapper;
            _bucketCreator ??= new ProviderBucketCreator(influxWrapper, context);
        }

        [AutomaticRetry(Attempts = 3, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                await CreateBucketsIfNeededAsync();

                _statusService.MarkAsRunning();
                var block = await _instance.GetLatestBlockInfoAsync();
                _statusService.MarkAsRanSuccessfully();
                await _influxWrapper.LogBlockAsync(block, _provider);
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
                _logger.LogError($"InfluxLogger<{typeof(T).Name}>: {e.GetType().Name} {e.Message}");
            }
        }
        private static async Task CreateBucketsIfNeededAsync()
        {
            if (!_bucketCreator.Created)
            {
                await _bucketCreator.CreateBucketsForProvidersAsync();
            }
        }
    }
}
