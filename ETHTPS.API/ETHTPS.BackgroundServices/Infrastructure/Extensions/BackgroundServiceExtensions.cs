using ETHTPS.Services.BlockchainServices;

using Hangfire;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using ETHTPS.Services.BlockchainServices.Extensions;
using ETHTPS.Services.BlockchainServices.Attributes;

namespace ETHTPS.Services.Infrastructure.Extensions
{
    public static class BackgroundServiceExtensions
    {
#pragma warning disable CS0618

        public static void RegisterHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression = "", string queue = "")
            where V: class, IBlockInfoProvider
            where T: HangfireBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<V>();
            services.AddScoped<T>();
            InitializeIfNecessary<V>(ref cronExpression, ref queue);
            RecurringJob.AddOrUpdate<T>(typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterHistoricalHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression = "", string queue = "")
           where V : class, IBlockInfoProvider
           where T : HangfireHistoricalBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            InitializeIfNecessary<V>(ref cronExpression, ref queue);
            RecurringJob.AddOrUpdate<T>("Historical" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterHistoricalHangfireDateBackgroundService<T, V>(this IServiceCollection services, string cronExpression = "", string queue = "")
           where V : class, IBlockInfoProvider
           where T : HangfireDateHistoricalBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            RecurringJob.AddOrUpdate<T>("DateHistorical" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        public static void RegisterTimeWarpHangfireBackgroundService<T, V>(this IServiceCollection services, string cronExpression = "", string queue = "")
          where V : class, IBlockInfoProvider
          where T : TimeWarpBlockInfoProviderDataLogger<V>
        {
            services.AddScoped<T>();
            services.AddScoped<V>();
            InitializeIfNecessary<V>(ref cronExpression, ref queue);
            RecurringJob.AddOrUpdate<T>("TimeWarp" + typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }


        public static void RegisterHangfireBackgroundService<T>(this IServiceCollection services, string cronExpression = "", string queue = "")
            where T : HangfireBackgroundService
        {
            services.AddScoped<T>();
            InitializeIfNecessary<T>(ref cronExpression, ref queue);
            RecurringJob.AddOrUpdate<T>(typeof(T).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

        private static void InitializeIfNecessary<T>(ref string cronExpression, ref string queue)
            where T : class
        {
            if (string.IsNullOrWhiteSpace(cronExpression))
            {
                cronExpression = typeof(T).ExtractFieldFromAttribute<T, RunEveryAttribute, string>(x => x.CronExpression);
            }
            if (string.IsNullOrWhiteSpace(queue))
            {
                queue = typeof(T).ExtractFieldFromAttribute<T, QueueAttribute, string>(x => x.Queue);
            }
        }

        /*
        public static void RegisterHangfireBackgroundService(this IServiceCollection services, Type backgroundServiceType, string cronExpression, string queue)
        {
            if (!typeof(HangfireBackgroundService).IsAssignableFrom(backgroundServiceType))
            {
                throw new ArgumentException($"{backgroundServiceType} is not of type {typeof(HangfireBackgroundService)}");
            }
            services.AddScoped(backgroundServiceType);
            typeof(RecurringJob).GetMethod("AddOrUpdate").MakeGenericMethod(backgroundServiceType).Invoke(RecurringJob, )
            RecurringJob.AddOrUpdate(,)
        }
        */
#pragma warning restore CS0618
    }
}
