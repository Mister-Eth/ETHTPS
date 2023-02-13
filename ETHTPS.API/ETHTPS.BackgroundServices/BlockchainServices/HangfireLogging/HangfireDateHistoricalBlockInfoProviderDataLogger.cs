using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices.Extensions;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.HangfireLogging
{
    public class HangfireDateHistoricalBlockInfoProviderDataLogger<T> : MSSQLLogger<T>
        where T : IBlockInfoProvider
    {
        public HangfireDateHistoricalBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context, IDataUpdaterStatusService statusService, ITimeBucketDataUpdaterService<T> timeBucketService) : base(instance, logger, context, statusService, timeBucketService)
        {
        }

        [AutomaticRetry(Attempts = 0, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            var date = DateTime.Now;
            for (int i = 0; i < 365; i++, date = date.Subtract(TimeSpan.FromDays(1))) //Past year
            {
                try
                {
                    var stopwatch = new System.Diagnostics.Stopwatch();
                    stopwatch.Start();

                    var delta = await CalculateTPSGPSAsync(date);
                    _timeBucketService.UpdateAllEntries(delta);
                    stopwatch.Stop();
                    _logger.LogInformation($"{_instance.GetProviderName()}: {delta.TPS}TPS @{date}");
                    await Task.Delay(350);
                }
                catch (Exception e)
                {
                    _logger.LogDebug("HangfireHistoricalBlockInfoProviderDataLogger", e);
                }
                finally
                {
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
