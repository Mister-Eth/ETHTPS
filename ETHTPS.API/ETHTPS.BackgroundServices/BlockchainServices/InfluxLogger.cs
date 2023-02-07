using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Data.Integrations.InfluxIntegration.ProviderServices;
using ETHTPS.Services.BlockchainServices.Extensions;
using ETHTPS.Services.BlockchainServices.Models;

using Hangfire;

using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class InfluxLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        private static IProviderBucketCreator _bucketCreator;

        private readonly IInfluxWrapper _influxWrapper;

        public InfluxLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IInfluxWrapper influxWrapper) : base(instance, logger, context)
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

                var block = await _instance.GetLatestBlockInfoAsync();
                await _influxWrapper.LogBlockAsync(block, _provider);
                TPSGPSInfo delta = await CalculateTPSGPSAsync(block);
                await _influxWrapper.LogTPSGPSInfoAsync(delta);
            }
            catch (InfluxException e)
            {
                _logger.LogError("InfluxLogger exception", e);
                throw;
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
