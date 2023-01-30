using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices.Extensions;

using Hangfire;

using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class HangfireDateHistoricalBlockInfoProviderDataLogger<T> : HangfireBlockInfoProviderDataLogger<T>
        where T : IBlockInfoProvider
    {
        public HangfireDateHistoricalBlockInfoProviderDataLogger(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context) : base(instance, logger, context)
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
                    UpdateMaxEntry(delta);

                    if (DateTime.Now.Subtract(delta.Date).TotalMinutes < 60)
                    {
                        AddOrUpdateHourTPSEntry(delta);
                    }
                    if (DateTime.Now.Subtract(delta.Date).TotalHours < 24)
                    {
                        AddOrUpdateDayTPSEntry(delta);
                    }
                    if (DateTime.Now.Subtract(delta.Date).TotalDays < 7)
                    {
                        AddOrUpdateWeekTPSEntry(delta);
                    }
                    if (DateTime.Now.Subtract(delta.Date).TotalDays < 30)
                    {
                        AddOrUpdateMonthTPSEntry(delta);
                    }
                    if (DateTime.Now.Subtract(delta.Date).TotalDays < 366)
                    {
                        AddOrUpdateYearTPSEntry(delta);
                    }
                    AddOrUpdateAllTPSEntry(delta);

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
