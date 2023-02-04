using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Scan.Implementations;
using ETHTPS.Services.Ethereum.Starkware;
using ETHTPS.Services.Ethereum;
using ETHTPS.Services;
using Microsoft.Extensions.DependencyInjection;
using static ETHTPS.API.Core.Constants;
using ETHTPS.Services.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;

namespace ETHTPS.DependencyInjection
{
    public static class DataUpdaterExtensions
    {
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
    }
}
