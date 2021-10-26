

using ETHTPS.API.Middlewares;
using ETHTPS.BackgroundServices;
using ETHTPS.BackgroundServices.CacheUpdaters;
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

        public void ConfigureServices(IServiceCollection services)
        {
            var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://ethtps.info");
                                      builder.WithOrigins("http://localhost:28999");
                                      builder.WithOrigins("http://localhost:3007");
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

#pragma warning disable CS0618
        private void AddTPSDataUpdaters(IServiceCollection services)
        {
            services.AddScoped<ArbiscanUpdater>();
            RecurringJob.AddOrUpdate<ArbiscanUpdater>("ArbiscanUpdater", x => x.RunAsync(), CronConstants.Every5s, queue: TPSUPDATERQUEUE);
            services.AddScoped<EtherscanUpdater>();
            RecurringJob.AddOrUpdate<EtherscanUpdater>("EtherscanUpdater", x => x.RunAsync(), CronConstants.Every10s, queue: TPSUPDATERQUEUE);
            services.AddScoped<OptimismUpdater>();
            RecurringJob.AddOrUpdate<OptimismUpdater>("OptimismUpdater", x => x.RunAsync(), CronConstants.Every5s, queue: TPSUPDATERQUEUE);
            services.AddScoped<PolygonscanUpdater>();
            RecurringJob.AddOrUpdate<PolygonscanUpdater>("PolygonscanUpdater", x => x.RunAsync(), CronConstants.Every5s, queue: TPSUPDATERQUEUE);
            services.AddScoped<XDAIUpdater>();
            RecurringJob.AddOrUpdate<XDAIUpdater>("XDAIUpdater", x => x.RunAsync(), CronConstants.Every5s, queue: TPSUPDATERQUEUE);
            services.AddScoped<ZKSwapUpdater>();
            RecurringJob.AddOrUpdate<ZKSwapUpdater>("ZKSwapUpdater", x => x.RunAsync(), CronConstants.EveryMinute, queue: TPSUPDATERQUEUE);
            services.AddScoped<ZKSyncUpdater>();
            RecurringJob.AddOrUpdate<ZKSyncUpdater>("ZKSyncUpdater", x => x.RunAsync(), CronConstants.EveryMinute, queue: TPSUPDATERQUEUE);
            services.AddScoped<AVAXCChainUpdater>();
            RecurringJob.AddOrUpdate<AVAXCChainUpdater>("AVAXCChainUpdater", x => x.RunAsync(), CronConstants.Every5s, queue: TPSUPDATERQUEUE);
            //services.AddScoped<DummyDyDxUpdater>();

        }

        private void AddCacheUpdaters(IServiceCollection services)
        {
            services.AddScoped<InstantCacheUpdater>();
            RecurringJob.AddOrUpdate<InstantCacheUpdater>("InstantDataUpdater", x => x.RunAsync(), CronConstants.Every5s, queue: CACHEUPDATERQUEUE);
            services.AddScoped<OneHourCacheUpdater>();
            RecurringJob.AddOrUpdate<OneHourCacheUpdater>("OneHourDataUpdater", x => x.RunAsync(), CronConstants.Every15Minutes, queue: CACHEUPDATERQUEUE);
            services.AddScoped<OneDayCacheUpdater>();
            RecurringJob.AddOrUpdate<OneDayCacheUpdater>("OneDayDataUpdater", x => x.RunAsync(), CronConstants.EveryHour, queue: CACHEUPDATERQUEUE);
            services.AddScoped<OneWeekCacheUpdater>();
            RecurringJob.AddOrUpdate<OneWeekCacheUpdater>("OneWeekDataUpdater", x => x.RunAsync(), CronConstants.EveryMidnight, queue: CACHEUPDATERQUEUE);
            services.AddScoped<OneMonthCacheUpdater>();
            RecurringJob.AddOrUpdate<OneMonthCacheUpdater>("OneMonthDataUpdater", x => x.RunAsync(), CronConstants.EveryMidnight, queue: CACHEUPDATERQUEUE);
        }

#pragma warning restore CS0618

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

            var queues = Configuration.GetSection("Hangfire").GetSection("Queues").Get<string[]>();
            app.UseHangfireServer(options: new BackgroundJobServerOptions()
            {
                Queues = queues?? new string[] { "default" }
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
