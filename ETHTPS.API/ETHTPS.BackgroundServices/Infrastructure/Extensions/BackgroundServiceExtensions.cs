using Hangfire;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.Infrastructure.Extensions
{
    public static class BackgroundServiceExtensions
    {
#pragma warning disable CS0618
        public static void RegisterHangfireBackgroundService<T>(this IServiceCollection services, string cronExpression, string queue)
            where T : HangfireBackgroundService
        {
            services.AddScoped<T>();
            RecurringJob.AddOrUpdate<T>(typeof(T).Name, x => x.RunAsync(), cronExpression, queue: queue);
        }

#pragma warning restore CS0618
    }
}
