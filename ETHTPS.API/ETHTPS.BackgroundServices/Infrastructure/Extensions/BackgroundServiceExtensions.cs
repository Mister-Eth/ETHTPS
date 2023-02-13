using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater.TimeBuckets;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using ETHTPS.Services.BlockchainServices.Status;

using Hangfire;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ETHTPS.Services.Infrastructure.Extensions
{
    public static class BackgroundServiceExtensions
    {
#pragma warning disable CS0618
        public static void RegisterHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
            where V : class, IBlockInfoProvider
            where T : MSSQLLogger<V>
        {
            services.AddScoped<V>();
            services.AddScoped<T>();
            RecurringJob.AddOrUpdate<T>(typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterInfluxHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
           where V : class, IBlockInfoProvider
           where T : InfluxLogger<V>
        {
            services.AddScoped<V>();
            services.AddScoped<T>();
            RecurringJob.AddOrUpdate<T>(typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterInfluxHangfireHistoricalBackgroundService<T, V>(this IServiceCollection services)
           where V : class, IBlockInfoProvider
           where T : HistoricalInfluxLogger<V>
        {
            services.TryAddScoped<V>();
            services.AddScoped<T>();
            BackgroundJob.Enqueue<T>(x => x.RunAsync());
        }

        public static void RegisterHistoricalHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
           where V : class, IBlockInfoProvider
           where T : HangfireHistoricalBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            RecurringJob.AddOrUpdate<T>("Historical" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterHistoricalHangfireDateBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
           where V : class, IBlockInfoProvider
           where T : HangfireDateHistoricalBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            RecurringJob.AddOrUpdate<T>("DateHistorical" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterTimeWarpHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
          where V : class, IBlockInfoProvider
          where T : TimeWarpBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            RecurringJob.AddOrUpdate<T>("TimeWarp" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }


        public static void RegisterHangfireBackgroundService<T>(this IServiceCollection services, string cronExpression, string queue)
            where T : HangfireBackgroundService
        {
            services.AddScoped<T>();
            RecurringJob.AddOrUpdate<T>(typeof(T).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

#pragma warning restore CS0618
    }
}
