

using ETHTPS.API.Security.Core.Authentication;
using ETHTPS.API.Core.Middlewares;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Policies;

using Hangfire;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ETHTPS.Configuration.Extensions;
using ETHTPS.Configuration.Database;

namespace ETHTPS.API
{
    public class Startup
    {
        private readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public string[] ConfigurationQueues => Configuration.GetSection("Hangfire").GetSection("Queues").Get<string[]>();

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDatabaseContext(Configuration);
            services.AddCustomCORSPolicies();

            services.AddControllersWithViews()
                .AddControllersAsServices()
                .ConfigureNewtonsoftJson();
            services.AddSwagger();
            
            services.AddMemoryCache()
                    .AddAPIKeyAuthenticationAndAuthorization()
                    .AddCoreServices()
                    .AddHistoricalDataProviders();
            services.RegisterMicroservice("ETHTPS.API.General", "General API");

#if DEBUG
            services.AddScoped<PublicDataInitializer>()
                    .AddScoped<PrivateDataInitializer>();
#endif
            if (ConfigurationQueues?.Length > 0)
            {
                Configuration.InitializeHangfire();
                services.AddHangfireServer(Configuration);
                services.AddTPSDataUpdaters(Configuration);
                services.AddHistoricalBlockInfoDataUpdaters(ConfigurationQueues);
                services.AddTimeWarpUpdaters(ConfigurationQueues)
                .AddStatusNotifiers(ConfigurationQueues);
            }

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.RequestsAreForwardedByReverseProxy();
            app.UseMiddleware<UnstableConnectionSimulatorMiddleware>(); //Simulating high server load
            app.UseMiddleware<AccesStatsMiddleware>();
            app.ConfigureHangfire(Configuration);
            app.ConfigureSwagger();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireAuthorization();
            });
        }
    }
}
