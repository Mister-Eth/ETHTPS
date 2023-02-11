using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Updater;
using Hangfire;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.Ethereum.JSONRPC;
using ETHTPS.API.Core.Integrations.MSSQL.Services.TimeBuckets.Extensions;
using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;

namespace ETHTPS.API.DependencyInjection
{
    public static class DataUpdaterExtensions
    {
        public static IServiceCollection AddDataUpdaterStatusService(this IServiceCollection services) =>
            services.AddTransient<IDataUpdaterStatusService, DataUpdaterService>();
        public static IServiceCollection AddUpdaterMonitoringTask(this IServiceCollection services)
        {
#pragma warning disable CS0618 // Type or member is obsolete
            RecurringJob.AddOrUpdate<UpdaterStatusBackgroundTask>(typeof(UpdaterStatusBackgroundTask).Name, x => x.RunAsync(), CronConstants.EveryHour, queue: STATUSUPDATERQUEUE);
#pragma warning restore CS0618 // Type or member is obsolete
            return services;
        }
        public static IServiceCollection AddInfluxTPSDataUpdaters(this IServiceCollection services, bool injectTimeBucketService = true)
        {
            if (injectTimeBucketService)
            {
                services.InjectTimeBucketService<EthereumBlockInfoProvider>();
                services.InjectTimeBucketService<NEARBlockInfoProvider>();
                services.InjectTimeBucketService<AuroraBlockInfoProvider>();
                services.InjectTimeBucketService<PalmBlockInfoProvider>();
                services.InjectTimeBucketService<CeloBlockInfoProvider>();
                services.InjectTimeBucketService<AVAXBlockInfoProvider>();
                services.InjectTimeBucketService<ArbitrumBlockInfoProvider>();
                services.InjectTimeBucketService<OptimismBlockInfoProvider>();
            }
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<EthereumBlockInfoProvider>, EthereumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<NEARBlockInfoProvider>, NEARBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<AuroraBlockInfoProvider>, AuroraBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<PalmBlockInfoProvider>, PalmBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<CeloBlockInfoProvider>, CeloBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<AVAXBlockInfoProvider>, AVAXBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ArbitrumBlockInfoProvider>, ArbitrumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<OptimismBlockInfoProvider>, OptimismBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<EthereumBlockInfoProvider>, EthereumBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<NEARBlockInfoProvider>, NEARBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<AuroraBlockInfoProvider>, AuroraBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<PalmBlockInfoProvider>, PalmBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<CeloBlockInfoProvider>, CeloBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<AVAXBlockInfoProvider>, AVAXBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<OptimismBlockInfoProvider>, OptimismBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<StarknetBlockInfoProvider>, StarknetBlockInfoProvider>();
            services.RegisterInfluxHangfireHistoricalBackgroundService<HistoricalInfluxLogger<PolygonBlockInfoProvider>, PolygonBlockInfoProvider>();


            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<PolygonBlockInfoProvider>, PolygonBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ArbitrumNovaBlockInfoProvider>, ArbitrumNovaBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<StarknetBlockInfoProvider>, StarknetBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ZKSpaceBlockInfoProvider>, ZKSpaceBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ImmutableXBlockInfoProvider>, ImmutableXBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<RoninBlockInfoProvider>, RoninBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<OMGNetworkBlockInfoProvider>, OMGNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ZKTubeBlockInfoProvider>, ZKTubeBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<FTMScanBlockInfoProvider>, FTMScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            return services;
        }
        public static IServiceCollection AddMSSQLTPSDataUpdaters(this IServiceCollection services)
        {
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<InfuraBlockInfoProviderBase>, InfuraBlockInfoProviderBase>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<PolygonBlockInfoProvider>, PolygonBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ArbitrumBlockInfoProvider>, ArbitrumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ArbitrumNovaBlockInfoProvider>, ArbitrumNovaBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<OptimismBlockInfoProvider>, OptimismBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            //services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ZKSpaceBlockInfoProvider>, ZKSpaceBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ImmutableXBlockInfoProvider>, ImmutableXBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<RoninBlockInfoProvider>, RoninBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<OMGNetworkBlockInfoProvider>, OMGNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<ZKTubeBlockInfoProvider>, ZKTubeBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<FTMScanBlockInfoProvider>, FTMScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundServiceAndTimeBucket<MSSQLLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            return services;
        }

        public static void RegisterHangfireBackgroundServiceAndTimeBucket<T, V>(this IServiceCollection services, string cronExpression, string queue)
            where V : class, IBlockInfoProvider
            where T : MSSQLLogger<V>
        {
            services.AddScoped<V>();
            services.InjectTimeBucketService<V>();
            services.AddScoped<T>();
#pragma warning disable CS0618 // Type or member is obsolete
            RecurringJob.AddOrUpdate<T>(typeof(V).Name, x => x.RunAsync(), cronExpression, queue: queue);
#pragma warning restore CS0618 // Type or member is obsolete
        }
    }
}
