using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models.DataEntries.BlockchainServices.Models;
using ETHTPS.Data.Core.Models.DataUpdater;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.HangfireLogging
{
    public class MSSQLLogger<T> : BlockInfoProviderDataLoggerBase<T>
         where T : IBlockInfoProvider
    {
        protected override string ServiceName { get => $"MSSQLLogger<{typeof(T).Name}>"; }
        protected readonly ITimeBucketDataUpdaterService<T> _timeBucketService;

        public MSSQLLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IDataUpdaterStatusService statusService, ITimeBucketDataUpdaterService<T> timeBucketService) : base(instance, logger, context, statusService, UpdaterType.TPSGPS)
        {
            _timeBucketService = timeBucketService;
        }
        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            try
            {
                TPSGPSInfo delta = await CalculateTPSGPSAsync();
                _timeBucketService.UpdateAllEntries(delta);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"{_provider}: {delta.TPS}TPS {delta.GPS}GPS");
            }
            catch (Exception e)
            {
                _logger.LogError("MSSQLLogger", e);
            }
        }


    }
}
