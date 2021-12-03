using ETHTPS.Services.BlockchainServices;

using Hangfire;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Infrastructure.Extensions
{
    public static class BackgroundServiceExtensions
    {
#pragma warning disable CS0618
        public static void RegisterHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
            where V: class, IBlockInfoProvider
            where T: HangfireBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<V>();
            services.AddScoped<T>();
            RecurringJob.AddOrUpdate<T>(typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterHistoricalHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression, string queue)
           where V : class, IBlockInfoProvider
           where T : HangfireHistoricalBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            RecurringJob.AddOrUpdate<T>("Historical" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
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
