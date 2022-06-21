﻿using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Services;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Infrastructure.Extensions;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.Constants.Queues;
using static ETHTPS.Constants.CronConstants;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;

namespace ETHTPS.API.Infrastructure.ServiceCollection.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<TPSService>();
            services.AddScoped<GPSService>();
            services.AddScoped<GasAdjustedTPSService>();
            services.AddScoped<GeneralService>();
            services.AddScoped<TimeWarpService>();
            services.AddScoped<FeatureService>();
            services.AddScoped<IBlockInfoProviderStatusService, BlockInfoProviderStatusService>();
            services.AddScoped<EthereumBlockTimeProvider>();
        }


        public static void AddHistoricalDataProviders(this IServiceCollection services)
        {
            services.AddScoped<IHistoricalDataProvider, OneHourHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneDayHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneWeekHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneMonthHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, OneYearHistoricalDataProvider>();
            services.AddScoped<IHistoricalDataProvider, AllHistoricalDataProvider>();
        }

        public static void AddDataProviders(this IServiceCollection services,
                                            bool addInstantDataUpdaters = true,
                                            bool addCacheUpdaters = true,
                                            bool addHistoricalBlockInfoProviderDataLoggers = false,
                                            bool addTimeWarpUpdaters = false)
        {
            if (addInstantDataUpdaters)
                services.AddInstantDataUpdaters();
            if (addCacheUpdaters)
                services.AddCacheUpdaters();
            if (addHistoricalBlockInfoProviderDataLoggers)
                services.AddHistoricalBlockInfoProviderDataLoggers();
            if (addTimeWarpUpdaters)
                services.AddTimeWarpUpdaters();
        }

        public static void AddInstantDataUpdaters(this IServiceCollection services)
        {
            //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<EtherscanBlockInfoProvider>, EtherscanBlockInfoProvider>(Every13s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<HabitatBlockInfoProvider>, HabitatBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSpaceBlockInfoProvider>, ZKSpaceBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ImmutableXBlockInfoProvider>, ImmutableXBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<RoninBlockInfoProvider>, RoninBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OMGNetworkBlockInfoProvider>, OMGNetworkBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKTubeBlockInfoProvider>, ZKTubeBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<FTMScanBlockInfoProvider>, FTMScanBlockInfoProvider>(Every5s, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(EveryHour, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(EveryHour, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
        }

        public static void AddHistoricalBlockInfoProviderDataLoggers(this IServiceCollection services)
        {
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireDateBackgroundService<HangfireDateHistoricalBlockInfoProviderDataLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireDateBackgroundService<HangfireDateHistoricalBlockInfoProviderDataLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            //services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<HabitatBlockInfoProvider>, HabitatBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
            //services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>(Never, HISTORICALUPDATERQUEUE);
        }

        public static void AddTimeWarpUpdaters(this IServiceCollection services)
        {
            services.RegisterTimeWarpHangfireBackgroundService<TimeWarpBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(Never, TIMEWARPUPDATERQUEUE);
        }

        public static void AddCacheUpdaters(this IServiceCollection services)
        {

        }

        public static void AddStatusNotifiers(this IServiceCollection services)
        {
            services.RegisterHangfireBackgroundService<APIStatusBackgroundTask>(EveryMinute, STATUSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<WebsiteStatusBackgroundTask>(EveryMinute, STATUSUPDATERQUEUE);
            //services.RegisterHangfireBackgroundService<UpdaterStatusBackgroundTask>(EveryMinute, STATUSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<PlausibleVisitorCountBackgroundTask>(EveryMidnight, STATUSUPDATERQUEUE);
        }
    }
}
