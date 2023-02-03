

using ETHTPS.API.Authentication;
using ETHTPS.API.Controllers.CRUD;
using ETHTPS.API.Infrastructure.Services.Experimentation;
using ETHTPS.API.Infrastructure.Services.ExternalWebsites;
using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.API.Infrastructure.Services.Info;
using ETHTPS.API.Infrastructure.Services.Markdown;
using ETHTPS.API.Infrastructure.Services.Recaptcha;
using ETHTPS.API.Middlewares;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
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
            var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://ethtps.info");
                                      builder.WithOrigins("https://ultrasound.money/");
                                      builder.WithOrigins("http://localhost:3007");
#if DEBUG
                                      builder.WithOrigins("http://10.2.0.18");
#endif
                                      builder.AllowAnyHeader();
                                  });
            });

            services.AddControllersWithViews()
                .AddControllersAsServices()
                .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
            });
            services.AddSwaggerGen(c =>
            {
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });
            services.AddDbContext<EthtpsContext>(options => options.UseSqlServer(defaultConnectionString), ServiceLifetime.Transient);
            services.AddMemoryCache();
            services.AddAuthentication("APIKey").AddScheme<AuthenticationSchemeOptions, APIKeyAuthenticationSchemeHandler>("APIKey", opts =>
            {

            });
            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes("APIKey")
                    .RequireAuthenticatedUser()
                    .Build();
                options.AddPolicy(PolicyConstants.EditorPolicy);
                options.AddPolicy(PolicyConstants.AdminPolicy);
            });

            AddServices(services);
            AddHistoricalDataProviders(services);
            if (ConfigurationQueues?.Length > 0)
            {
                InitializeHangFire(defaultConnectionString);
                services.AddHangfire(x => x.UseSqlServerStorage(defaultConnectionString));
                services.AddHangfireServer(options =>
                {
                    options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
                });
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
            services.AddScoped<IExperimentService, ExperimentService>();
            services.AddScoped<IInfoService, InfoService>();
            services.AddScoped<IRecaptchaVerificationService, RecaptchaVerificationService>();
            services.AddScoped<IExternalWebsitesService, ExternalWebsitesService>();
            services.AddScoped<IMarkdownService, MarkdownService>();
            services.AddScoped<IProvidersService, ProvidersService>();
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
                services.RegisterHistoricalHangfireDateBackgroundService<HangfireDateHistoricalBlockInfoProviderDataLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                services.RegisterHistoricalHangfireDateBackgroundService<HangfireDateHistoricalBlockInfoProviderDataLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
                services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(CronConstants.Never, HISTORICALUPDATERQUEUE);
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
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ArbitrumNovaBlockInfoProvider>, ArbitrumNovaBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
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
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
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
                services.RegisterHangfireBackgroundService<MainAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<TPSAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<GPSAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<GeneralAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
                services.RegisterHangfireBackgroundService<TimeWarpAPIStatusBackgroundTask>(CronConstants.EveryMinute, STATUSUPDATERQUEUE);
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
            services.AddScoped<IHistoricalDataProvider, InstantDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneMinuteHistoricalDataProvider>();
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
