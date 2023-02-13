using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;
using ETHTPS.Services.Ethereum.JSONRPC.Infura;
using ETHTPS.Services.BlockchainServices.HangfireLogging;

namespace ETHTPS.API.DependencyInjection
{
    public static class TimeWarpExtensions
    {
        public static IServiceCollection AddTimeWarpUpdaters(this IServiceCollection services, string[] configurationQueues)
        {
            if (configurationQueues.Contains(TIMEWARPUPDATERQUEUE))
            {
                services.RegisterTimeWarpHangfireBackgroundService<TimeWarpBlockInfoProviderDataLogger<InfuraBlockInfoProviderBase>, InfuraBlockInfoProviderBase>(CronConstants.Never, TIMEWARPUPDATERQUEUE);
            }
            return services;
        }

    }
}
