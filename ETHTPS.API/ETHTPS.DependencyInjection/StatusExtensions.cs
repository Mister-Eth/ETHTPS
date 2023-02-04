using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord.Endpoints;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;

namespace ETHTPS.API.DependencyInjection
{
    public static class StatusExtensions
    {
        public static IServiceCollection AddStatusNotifiers(this IServiceCollection services, string[] configurationQueues)
        {
            if (configurationQueues.Contains(STATUSUPDATERQUEUE))
            {
                services.RegisterHangfireBackgroundService<MainAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<TPSAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<GPSAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<GeneralAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<TimeWarpAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<WebsiteStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                //services.RegisterHangfireBackgroundService<UpdaterStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<PlausibleVisitorCountBackgroundTask>(CronConstants.EveryMidnight, STATUSUPDATERQUEUE);
            }
            return services;
        }
    }
}
