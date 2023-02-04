using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;

namespace ETHTPS.DependencyInjection
{
    public static class HistoricalUpdaterExtensions
    {
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

    }
}
