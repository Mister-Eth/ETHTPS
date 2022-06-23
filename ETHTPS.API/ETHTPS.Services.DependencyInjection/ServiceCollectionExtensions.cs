using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Services;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.BlockchainServices.Status;
using ETHTPS.Services.Infrastructure.Extensions;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.Services.Constants.Queues;
using static ETHTPS.Services.Constants.CronConstants;
using ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord;
using System.Reflection;
using System;
using ETHTPS.Services.BlockchainServices.Extensions.Assemblies;
using System.Linq;
using ETHTPS.Services.PSServices.Implementations;
using static ETHTPS.Services.DependencyInjection.Extensions.AssemblyExtensions;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;

namespace ETHTPS.Services.DependencyInjection
{
    // Complete mess, will fix some time
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
        {/*
            var blockInfoProviderDescriptors = GetApplicationAssemblies().SelectMany(assembly => assembly.GetAllBlockInfoProviders()).ToList();
            var genericMethodReference = typeof(BackgroundServiceExtensions).GetMethods().Where(x => x.Name == nameof(BackgroundServiceExtensions.RegisterHangfireBackgroundService)).First(x => x.GetGenericArguments().Length == 2);
            foreach(var descriptor in blockInfoProviderDescriptors)
            {
                //services.AddScoped(descriptor.ImplementationType);
                var dataLoggerType = typeof(HangfireBlockInfoProviderDataLogger<>).MakeGenericType(descriptor.ImplementationType);
                var methodInfo = genericMethodReference.MakeGenericMethod(dataLoggerType, descriptor.ImplementationType);
                methodInfo.Invoke(services, new object[] { Every13s, TPSUPDATERQUEUE });
            }
            //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<EtherscanBlockInfoProvider>, EtherscanBlockInfoProvider>(Every13s, TPSUPDATERQUEUE);
            */
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>();
            //services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<HabitatBlockInfoProvider>, HabitatBlockInfoProvider>(EveryMinute, TPSUPDATERQUEUE);
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonScanBlockInfoProvider>, PolygonScanBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ArbiscanBlockInfoProvider>, ArbiscanBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OptimisticEthereumBlockInfoProvider>, OptimisticEthereumBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<SnowTraceBlockInfoProvider>, SnowTraceBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<LoopringBlockInfoProvider>, LoopringBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BobaNetworkBlockInfoProvider>, BobaNetworkBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<XDAIBlockInfoProvider>, XDAIBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSwapBlockInfoProvider>, ZKSwapBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSpaceBlockInfoProvider>, ZKSpaceBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKSsyncBlockInfoProvider>, ZKSsyncBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<AztecBlockInfoProvider>, AztecBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ImmutableXBlockInfoProvider>, ImmutableXBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<MetisBlockInfoProvider>, MetisBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<RoninBlockInfoProvider>, RoninBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<VoyagerBlockInfoProvider>, VoyagerBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<Nahmii20BlockInfoProvider>, Nahmii20BlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<OMGNetworkBlockInfoProvider>, OMGNetworkBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<ZKTubeBlockInfoProvider>, ZKTubeBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<FTMScanBlockInfoProvider>, FTMScanBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<SorareBlockInfoProvider>, SorareBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<DeversiFiBlockInfoProvider>, DeversiFiBlockInfoProvider>();
            services.RegisterHangfireBackgroundService<HangfireBlockInfoProviderDataLogger<PolygonHermezBlockInfoProvider>, PolygonHermezBlockInfoProvider>();
      
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
            //services.RegisterHistoricalHangfireBackgroundService<HangfireHistoricalBlockInfoProviderDataLogger<BSCScanBlockInfoProvider>, BSCScanBlockInfoProvider>();
        }

        public static void AddTimeWarpUpdaters(this IServiceCollection services)
        {
         // services.RegisterTimeWarpHangfireBackgroundService<TimeWarpBlockInfoProviderDataLogger<InfuraBlockInfoProvider>, InfuraBlockInfoProvider>(Never, TIMEWARPUPDATERQUEUE);
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
