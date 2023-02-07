using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Models;
using ETHTPS.Services.InfluxWrapper.ProviderServices;
using ETHTPS.Services.InfluxWrapper.ProviderServices.Extensions;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace ETHTPS.Services.InfluxWrapper
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
