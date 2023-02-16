

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ETHTPS.Configuration.Extensions;
using ETHTPS.Configuration.Database;
using ETHTPS.API.Core.Middlewares;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Core.Authentication;
using Coravel;
using ETHTPS.Services.BackgroundTasks.Recurring.Aggregated;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;

namespace ETHTPS.API
{
    public class Startup
    {
        private readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        const string APP_NAME = "ETHTPS.API.General";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDatabaseContext(APP_NAME);
            services.AddCustomCORSPolicies();

            services.AddControllersWithViews()
                .AddControllersAsServices()
                .ConfigureNewtonsoftJson();
            services.AddSwagger()
                    .AddMemoryCache()
                    .AddAPIKeyProvider()
                    .AddAPIKeyAuthenticationAndAuthorization()
                    .AddDataProviderServices(DatabaseProvider.MSSQL)
                    .AddMixedCoreServices()
                    .AddQueue()
                    .AddCache()
                    .AddScoped<AggregatedEndpointStatsBuilder>()
                    .AddInfluxHistoricalDataProvider() //Not working r/n
                    .AddMSSQLHistoricalDataServices()
                    .RegisterMicroservice(APP_NAME, "General API");
            services.AddDataUpdaterStatusService();

#if DEBUG
            services.AddScoped<PublicDataInitializer>()
                    .AddScoped<PrivateDataInitializer>();
#endif
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.RequestsAreForwardedByReverseProxy();
            //app.UseMiddleware<UnstableConnectionSimulatorMiddleware>(); //Simulating high server load
            app.UseMiddleware<AccesStatsMiddleware>();
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
