

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
using ETHTPS.Services.BlockchainServices.Scan.Implementations;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Scan;
using ETHTPS.Data.Database.HistoricalDataProviders;

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
            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(defaultConnectionString));
            services.AddMemoryCache();
            InitializeHangFire(defaultConnectionString);
            services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
            services.AddHangfireServer();
            AddTPSDataUpdaters(services);
            AddCacheUpdaters(services);
            AddHistoricalDataProviders(services);
        }
        private void AddTPSDataUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(TPSUPDATERQUEUE))
            {
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<EtherscanBlockInfoProvider>, EtherscanBlockInfoProvider>(CronConstants.Every14s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<AVAXCChainBlockInfoProvider>, AVAXCChainBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            }
        }

        private void AddCacheUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(CACHEUPDATERQUEUE))
            {

            }
        }

        private void AddHistoricalDataProviders(IServiceCollection services)
        {
            services.AddScoped<IHistoricalDataProvider, OneHourHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneDayHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneWeekHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneMonthHistoricalDataProvider>();
        }

        public static void InitializeHangFire(string connectionString)
        {
            var sqlStorage = new SqlServerStorage(connectionString);
            JobStorage.Current = sqlStorage;
        }

        private const string TPSUPDATERQUEUE = "tpsdata";
        private const string CACHEUPDATERQUEUE = "cache";

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
