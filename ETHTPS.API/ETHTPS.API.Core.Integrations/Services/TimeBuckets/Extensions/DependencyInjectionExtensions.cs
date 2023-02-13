using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.Services.BlockchainServices.Status;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services.TimeBuckets.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static void InjectTimeBucketService<V>(this IServiceCollection services)
           where V : class, IBlockInfoProvider
        {
            services.TryAddScoped<V>();
            services.AddScoped<ITimeBucketDataUpdaterService<V>, MSSQLTimeBucketService<V>>();
        }
    }
}
