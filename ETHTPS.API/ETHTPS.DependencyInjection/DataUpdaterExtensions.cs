using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using Hangfire;
using ETHTPS.Services.BackgroundTasks.Recurring.Database;
using ETHTPS.API.Core.Integrations.MSSQL.Services.DataUpdater;

namespace ETHTPS.API.DependencyInjection
{
    public static class DataUpdaterExtensions
    {
        public static void AddDataUpdaterStatusService(this IServiceCollection services) =>
            services.AddScoped<IDataUpdaterStatusService, DataUpdaterService>();
        public static void AddInfluxTPSDataUpdaters(this IServiceCollection services)
        {
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<ArbitrumNovaBlockInfoProvider>, ArbitrumNovaBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterInfluxHangfireBackgroundService<InfluxLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
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
        }
        public static void AddMSSQLTPSDataUpdaters(this IServiceCollection services)
        {
            services.RegisterHangfireBackgroundService<MSSQLLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<HabitatBlockInfoProvider>, HabitatBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ArbitrumNovaBlockInfoProvider>, ArbitrumNovaBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ZKSpaceBlockInfoProvider>, ZKSpaceBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ImmutableXBlockInfoProvider>, ImmutableXBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<RoninBlockInfoProvider>, RoninBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<OMGNetworkBlockInfoProvider>, OMGNetworkBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<ZKTubeBlockInfoProvider>, ZKTubeBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<FTMScanBlockInfoProvider>, FTMScanBlockInfoProvider>(CronConstants.Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(CronConstants.EveryHour, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<MSSQLLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(CronConstants.EveryMinute, TPSUPDATERQUEUE);
        }
    }
}
