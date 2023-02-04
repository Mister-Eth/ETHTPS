

using ETHTPS.API.Authentication;
using ETHTPS.API.Controllers.CRUD;
using ETHTPS.API.Core.Infrastructure.Services.Experimentation;
using ETHTPS.API.Core.Infrastructure.Services.ExternalWebsites;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.Core.Infrastructure.Services.Info;
using ETHTPS.API.Core.Infrastructure.Services.Markdown;
using ETHTPS.API.Core.Infrastructure.Services.Recaptcha;
using ETHTPS.API.Middlewares;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.API.DependencyInjection;
using ETHTPS.API.Security.Policies;
using ETHTPS.Services;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord.Endpoints;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Infrastructure.Extensions;

using Hangfire;
using Hangfire.SqlServer;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Configuration;
using System.Linq;

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
            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            
            services.AddMemoryCache()
                    .AddAPIKeyAuthenticationAndAuthorization()
                    .AddCoreServices()
                    .AddHistoricalDataProviders();

            if (ConfigurationQueues?.Length > 0)
            {
                Configuration.InitializeHangFire();
                services.ConfigureHangfire(Configuration);
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
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseMiddleware<UnstableConnectionSimulatorMiddleware>(); //Simulating high server load
            app.UseMiddleware<AccesStatsMiddleware>();
            // GlobalConfiguration.Configuration.UseActivator(new HangfireActivator(serviceProvider));
            if (ConfigurationQueues?.Length > 0)
            {
                app.UseHangfireServer(options: new BackgroundJobServerOptions()
                {
                    Queues = ConfigurationQueues ?? new string[] { "default" }
                });
                if (Configuration.GetSection("Hangfire").GetValue<bool>("Show"))
                {
                    app.UseHangfireDashboard();
                }
            }
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ETHTPS API V1");
                c.RoutePrefix = string.Empty;
            });
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
