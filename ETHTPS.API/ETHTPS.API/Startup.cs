

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
using ETHTPS.API.Infrastructure.Services;
using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using ETHTPS.Services.BlockchainServices.BlockTime;

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
                                      builder.AllowAnyHeader();
                                  });
            });

            services.AddControllers().AddNewtonsoftJson().AddJsonOptions(options => { options.JsonSerializerOptions.IgnoreNullValues = true; });
            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(defaultConnectionString), ServiceLifetime.Transient);
            services.AddMemoryCache();

            AddServices(services);
            AddHistoricalDataProviders(services);
            if (ConfigurationQueues?.Length > 0)
            {
                InitializeHangFire(defaultConnectionString);
                services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
                services.AddHangfireServer();
                AddTPSDataUpdaters(services);
                AddCacheUpdaters(services);
                AddHistoricalBlockInfoDataUpdaters(services);
                AddTimeWarpUpdaters(services);
                AddStatusNotifiers(services);
            }
           
        }

        private void AddServices(IServiceCollection services)
        {
            services.AddScoped<TPSService>();
            services.AddScoped<GPSService>();
            services.AddScoped<GasAdjustedTPSService>();
            services.AddScoped<GeneralService>();
            services.AddScoped<TimeWarpService>();
            services.AddScoped<IBlockInfoProviderStatusService, BlockInfoProviderStatusService>();
            services.AddScoped<EthereumBlockTimeProvider>();
        }

        private void AddHistoricalBlockInfoDataUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(HISTORICALUPDATERQUEUE))
            {
                     //services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<EtherscanBlockInfoProvider>, EtherscanBlockInfoProvider>(CronConstants.EveryMidnight, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     //services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<HabitatBlockInfoProvider>, HabitatBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                     //services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
            }
        }

        private void AddTPSDataUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(TPSUPDATERQUEUE))
            {
                //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<EtherscanBlockInfoProvider>, EtherscanBlockInfoProvider>(CronConstants.Every13s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<HabitatBlockInfoProvider>, HabitatBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSpaceBlockInfoProvider>, ZKSpaceBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ImmutableXBlockInfoProvider>, ImmutableXBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<RoninBlockInfoProvider>, RoninBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OMGNetworkBlockInfoProvider>, OMGNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKTubeBlockInfoProvider>, ZKTubeBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<FTMScanBlockInfoProvider>, FTMScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            }
        }

        private void AddCacheUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(CACHEUPDATERQUEUE))
            {
                
            }
        }

        private void AddStatusNotifiers(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(STATUSUPDATERQUEUE))
            {
                services.RegisterHangfireBackgroundService<APIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<WebsiteStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                //services.RegisterHangfireBackgroundService<UpdaterStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<PlausibleVisitorCountBackgroundTask>(CronConstants.EveryMidnight, STATUSUPDATERQUEUE);
            }
        }

        private void AddTimeWarpUpdaters(IServiceCollection services)
        {
            if (ConfigurationQueues.Contains(TIMEWARPUPDATERQUEUE))
            {
                services.RegisterTimeWarpHangfireBackgroundService<TimeWarpBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Never, TIMEWARPUPDATERQUEUE);
            }
        }

        private void AddHistoricalDataProviders(IServiceCollection services)
        {
            services.AddScoped<IHistoricalDataProvider, OneHourHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneDayHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneWeekHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneMonthHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneYearHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, AllHistoricalDataProvider>();
        }

        public static void InitializeHangFire(string connectionString)
        {
            var sqlStorage = new SqlServerStorage(connectionString);
            JobStorage.Current = sqlStorage;
        }

        private const string TPSUPDATERQUEUE = "tpsdata";
        private const string CACHEUPDATERQUEUE = "cache";
        private const string STATUSUPDATERQUEUE = "status";
        private const string HISTORICALUPDATERQUEUE = "historical";
        private const string TIMEWARPUPDATERQUEUE = "timewarp";

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
