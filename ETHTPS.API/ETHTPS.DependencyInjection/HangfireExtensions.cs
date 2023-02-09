using Microsoft.Extensions.Configuration;
using Hangfire.SqlServer;
using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

namespace ETHTPS.API.DependencyInjection
{
    public static class HangfireExtensions
    {
        private const string DEFAULT_CONNECTION_STRING_NAME = "HangfireConnectionString";
        public static void InitializeHangfire(this IServiceCollection services, string appName)
        {
            SqlServerStorage sqlStorage = new(services.GetConnectionString(appName, DEFAULT_CONNECTION_STRING_NAME));
            JobStorage.Current = sqlStorage;
        }

        public static IServiceCollection AddHangfireServer(this IServiceCollection services, string appName)
        {
            services.AddHangfire(x => x.UseSqlServerStorage(services.GetConnectionString(appName, DEFAULT_CONNECTION_STRING_NAME)));
            services.AddHangfireServer(options =>
            {
                options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
            });
            return services;
        }

        public static IApplicationBuilder ConfigureHangfire(this IApplicationBuilder app, string[] configurationQueues)
        {
            app.UseHangfireServer(options: new BackgroundJobServerOptions()
            {
                Queues = configurationQueues
            });
            return app;
        }
    }
}