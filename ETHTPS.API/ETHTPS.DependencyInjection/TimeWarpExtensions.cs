using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;

namespace ETHTPS.DependencyInjection
{
    public static class TimeWarpExtensions
    {
        public static IServiceCollection AddTimeWarpUpdaters(this IServiceCollection services, string[] configurationQueues)
        {
            if (configurationQueues.Contains(TIMEWARPUPDATERQUEUE))
            {
                services.RegisterTimeWarpHangfireBackgroundService<TimeWarpBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Never, TIMEWARPUPDATERQUEUE);
            }
            return services;
        }

    }
}
