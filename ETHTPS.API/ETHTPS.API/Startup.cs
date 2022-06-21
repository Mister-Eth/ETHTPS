

using ETHTPS.API.Middlewares;
using ETHTPS.Services;
using ETHTPS.Services.Infrastructure.Extensions;
using ETHTPS.Data.Database;

using Hangfire;
using Hangfire.SqlServer;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Linq;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.API.Infrastructure.Services;
using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.API.Infrastructure.ServiceCollection.Extensions;
using static ETHTPS.Constants.Queues;
using static ETHTPS.Constants.CronConstants;

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
            var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://ethtps.info");
                                      builder.WithOrigins("https://ultrasound.money/");
                                      builder.WithOrigins("http://localhost:3007");
                                      builder.WithOrigins("http://localhost:3000");
                                      builder.AllowAnyHeader();
                                  });
            });

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            }).AddJsonOptions(options => 
            { 
                options.JsonSerializerOptions.IgnoreNullValues = true; 
            });
            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(defaultConnectionString), ServiceLifetime.Transient);
            services.AddMemoryCache();

            services.AddCoreServices();
            services.AddHistoricalDataProviders();
            if (ConfigurationQueues?.Length > 0)
            {
                InitializeHangFire(defaultConnectionString);
                services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
                services.AddHangfireServer(options =>
                {
                    options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
                });
                services.AddDataProviders(ConfigurationQueues.Contains(TPSUPDATERQUEUE), ConfigurationQueues.Contains(CACHEUPDATERQUEUE), ConfigurationQueues.Contains(HISTORICALUPDATERQUEUE), ConfigurationQueues.Contains(TIMEWARPUPDATERQUEUE));
                if (ConfigurationQueues.Contains(STATUSUPDATERQUEUE))
                    services.AddStatusNotifiers();
            }
           
        }


        public static void InitializeHangFire(string connectionString)
        {
            var sqlStorage = new SqlServerStorage(connectionString);
            JobStorage.Current = sqlStorage;
        }

      

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
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
            app.UseCors(MyAllowSpecificOrigins);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
