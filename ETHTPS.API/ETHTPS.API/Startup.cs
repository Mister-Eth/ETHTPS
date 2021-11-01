

using ETHTPS.API.Middlewares;
using ETHTPS.BackgroundServices;
using ETHTPS.BackgroundServices.CacheUpdaters;
using ETHTPS.BackgroundServices.Infrastructure.Extensions;
using ETHTPS.BackgroundServices.TPSDataUpdaters.Http;
using ETHTPS.BackgroundServices.TPSDataUpdaters.Standard;
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
                                      builder.WithOrigins("http://localhost:3007");
                                      builder.AllowAnyHeader();
                                  });
            });

            services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options => { options.JsonSerializerOptions.IgnoreNullValues = true; });
            services.AddSwaggerGen();
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(defaultConnectionString));
            services.AddMemoryCache();
            InitializeHangFire(defaultConnectionString);
            services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
            services.AddHangfireServer();
            AddCacheUpdaters(services);
            AddTPSDataUpdaters(services);
        }

        public static void InitializeHangFire(string connectionString)
        {
            var sqlStorage = new SqlServerStorage(connectionString);
            JobStorage.Current = sqlStorage;
        }

        private const string TPSUPDATERQUEUE = "tpsdata";
        private const string CACHEUPDATERQUEUE = "cache";

        private void AddTPSDataUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(TPSUPDATERQUEUE))
            {
                services.RegisterHangfireBackgroundService<ArbiscanUpdater>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<EtherscanUpdater>(CronConstants.Every10s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<OptimismUpdater>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<PolygonscanUpdater>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<XDAIUpdater>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<ZKSwapUpdater>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<ZKSyncUpdater>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<AVAXCChainUpdater>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<LoopringUpdater>(CronConstants.Every5Minutes, TPSUPDATERQUEUE);

                services.RegisterHangfireBackgroundService<InstantCacheUpdater>(CronConstants.Every5s, TPSUPDATERQUEUE);
            }
        }

        private void AddCacheUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(CACHEUPDATERQUEUE))
            {
                services.RegisterHangfireBackgroundService<OneHourCacheUpdater>(CronConstants.Every15Minutes, CACHEUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<OneDayCacheUpdater>(CronConstants.EveryHour, CACHEUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<OneWeekCacheUpdater>(CronConstants.EveryMidnight, CACHEUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<OneMonthCacheUpdater>(CronConstants.EveryMidnight, CACHEUPDATERQUEUE);
            }
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

            app.UseHangfireServer(options: new BackgroundJobServerOptions()
            {
                Queues = ConfigurationQueues ?? new string[] { "default" }
            });
            if (Configuration.GetSection("Hangfire").GetValue<bool>("Show"))
            {
                app.UseHangfireDashboard();
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
