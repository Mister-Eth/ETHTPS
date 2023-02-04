using Microsoft.Extensions.Configuration;
using Hangfire.SqlServer;
using Hangfire;
using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.DependencyInjection
{
    public static class HangfireExtensions
    {
        public static void InitializeHangFire(this IConfiguration configuration)
        {
            SqlServerStorage sqlStorage = new(configuration.GetDefaultConnectionString());
            JobStorage.Current = sqlStorage;
        }

        public static IServiceCollection ConfigureHangfire(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHangfire(x => x.UseSqlServerStorage(configuration.GetDefaultConnectionString()));
            services.AddHangfireServer(options =>
            {
                options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
            });
            return services;
        }
    }
}