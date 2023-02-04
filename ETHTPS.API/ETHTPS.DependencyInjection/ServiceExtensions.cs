using ETHTPS.API.Core.Infrastructure.Services.Experimentation;
using ETHTPS.API.Core.Infrastructure.Services.ExternalWebsites;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.Core.Infrastructure.Services.Info;
using ETHTPS.API.Core.Infrastructure.Services.Markdown;
using ETHTPS.API.Core.Infrastructure.Services.Recaptcha;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.TimeWarp;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Infrastructure.Extensions;
using static ETHTPS.API.Core.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord.Endpoints;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using Hangfire.SqlServer;
using Hangfire;
using ETHTPS.Data.Database.HistoricalDataProviders;

namespace ETHTPS.DependencyInjection
{
    public static class ServiceExtensions
    {
       private static string? GetDefaultConnectionString(this IConfiguration configuration) => configuration.GetConnectionString("DefaultConnection");
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
        {
            var defaultConnectionString = configuration.GetDefaultConnectionString();
            services.AddDbContext<EthtpsContext>(options => options.UseSqlServer(defaultConnectionString), ServiceLifetime.Transient);
            return services;
        }

        public static IServiceCollection AddCoreServices(this IServiceCollection services)
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
            return services;
        }
        public static IServiceCollection AddStatusNotifiers(this IServiceCollection services, string[] configurationQueues)
        {
            if (configurationQueues.Contains(STATUSUPDATERQUEUE))
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
            return services;
        }

        public static IServiceCollection AddTimeWarpUpdaters(this IServiceCollection services, string[] configurationQueues)
        {
            if (configurationQueues.Contains(TIMEWARPUPDATERQUEUE))
            {
                services.RegisterTimeWarpHangfireBackgroundService<TimeWarpBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Never, TIMEWARPUPDATERQUEUE);
            }
            return services;
        }

        public static void AddTPSDataUpdaters(this IServiceCollection services, IConfiguration configuration)
        {
            var configurationQueues = configuration.GetSection("Hangfire").GetSection("Queues").Get<string[]>();
            if (configurationQueues is null)
                return;
            if (!configurationQueues.Contains(TPSUPDATERQUEUE))
                return;

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
        public static IServiceCollection AddHistoricalBlockInfoDataUpdaters(this IServiceCollection services, string[] configurationQueues)
        {
            if (configurationQueues.Contains(HISTORICALUPDATERQUEUE))
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
            return services;
        }

        public static void InitializeHangFire(this IConfiguration configuration)
        {
            var sqlStorage = new SqlServerStorage(configuration.GetDefaultConnectionString());
            JobStorage.Current = sqlStorage;
        }


        public static IServiceCollection AddHistoricalDataProviders(this IServiceCollection services)
        {
            services.AddScoped<IHistoricalDataProvider, OneHourHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneDayHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneWeekHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneMonthHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneYearHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, AllHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, InstantDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneMinuteHistoricalDataProvider>();
            return services;
        }


        public static IServiceCollection ConfigureHangfire(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHangfire(x => x.UseSqlServerStorage(configuration.GetDefaultConnectionString()));
            services.AddHangfireServer(options =>
            {
                options.SchedulePollingInterval = TimeSpan.FromSeconds(5);
            });
            return services;
        }
    }
}