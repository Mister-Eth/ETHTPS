using Microsoft.Extensions.Configuration;
using Hangfire.SqlServer;
using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

namespace ETHTPS.API.DependencyInjection
{
    public static class HangfireExtensions
    {
        public static void InitializeHangfire(this IConfiguration configuration)
        {
            SqlServerStorage sqlStorage = new(configuration.GetDefaultConnectionString());
            JobStorage.Current = sqlStorage;
        }

        public static IServiceCollection AddHangfireServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHangfire(x => x.UseSqlServerStorage(configuration.GetDefaultConnectionString()));
            services.AddHangfireServer(options =>
            {
                options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
            });
            return services;
        }

        public static IApplicationBuilder ConfigureHangfire(this IApplicationBuilder app, IConfiguration configuration)
        {
            app.UseHangfireServer(options: new BackgroundJobServerOptions()
            {
                Queues = configuration.GetSection("Hangfire").GetSection("Queues").Get<string[]>() ?? new string[] { "default" }
            });
            return app;
        }
    }
}