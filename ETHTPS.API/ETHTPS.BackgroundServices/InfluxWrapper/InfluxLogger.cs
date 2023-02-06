using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace ETHTPS.Services.InfluxWrapper
{
    public class InfluxLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        private readonly IInfluxWrapper _influxWrapper;
        public InfluxLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IInfluxWrapper influxWrapper) : base(instance, logger, context)
        {
            _influxWrapper = influxWrapper;
        }

        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                TPSGPSInfo delta = await CalculateTPSGPSAsync();
                _influxWrapper.Log(delta);
                _logger.Log(LogLevel.Information, $"Logged entry for {_provider} using Influx");
            }
            catch (InfluxException e)
            {
                _logger.LogError("InfluxLogger exception", e);
                throw;
            }
        }
    }
}
