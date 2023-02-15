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
using ETHTPS.API.Core.Integrations.MSSQL.Services.TimeBuckets.Extensions;
using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Services.Ethereum.JSONRPC.Infura;
using ETHTPS.Services.Ethereum.JSONRPC.Generic;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using ETHTPS.Services.BlockchainServices.CoravelLoggers;
using Microsoft.AspNetCore.Builder;
using Coravel;
using Coravel.Scheduling.Schedule;
using Coravel.Scheduling.Schedule.Interfaces;
using ETHTPS.Services.Attributes;
using System.Reflection;

namespace ETHTPS.API.DependencyInjection
{
    public static class DataUpdaterExtensions
    {
        public static IServiceCollection AddDataUpdaterStatusService(this IServiceCollection services) =>
            services.AddTransient<IDataUpdaterStatusService, DataUpdaterStatusService>();
        private static Type[] _enabledUpdaters = new[]
        {
            typeof(EthereumBlockInfoProvider),
            typeof(AuroraBlockInfoProvider),
            typeof(AVAXBlockInfoProvider),
            typeof(CeloBlockInfoProvider),
            typeof(NEARBlockInfoProvider),
            typeof(PalmBlockInfoProvider),
            typeof(PolygonBlockInfoProvider),
            typeof(StarknetBlockInfoProvider),
            typeof(PolygonBlockInfoProvider),
            typeof(ArbitrumBlockInfoProvider),
            typeof(OptimismBlockInfoProvider),
            typeof(LoopringBlockInfoProvider),
            typeof(BobaNetworkBlockInfoProvider),
            typeof(XDAIBlockInfoProvider),
            typeof(ZKSwapBlockInfoProvider),
            typeof(ZKSpaceBlockInfoProvider),
            typeof(ZKSsyncBlockInfoProvider),
            typeof(AztecBlockInfoProvider),
            typeof(ImmutableXBlockInfoProvider),
            typeof(MetisBlockInfoProvider),
            typeof(RoninBlockInfoProvider),
            typeof(VoyagerBlockInfoProvider),
            typeof(Nahmii20BlockInfoProvider),
            typeof(BSCScanBlockInfoProvider),
            typeof(OMGNetworkBlockInfoProvider),
            typeof(ZKTubeBlockInfoProvider),
            typeof(FTMScanBlockInfoProvider),
            typeof(SorareBlockInfoProvider),
            typeof(DeversiFiBlockInfoProvider),
            typeof(PolygonHermezBlockInfoProvider),
        };
        public static IServiceCollection AddDataServices(this IServiceCollection services) => services.AddScoped(_enabledUpdaters);
        public static IServiceCollection AddRunner(this IServiceCollection services, BackgroundServiceType type)
        {
            switch (type)
            {
                case BackgroundServiceType.Coravel:
                    services.AddScheduler();
                    services.AddScoped(_enabledUpdaters.Select(x => typeof(CoravelBlockLogger<>).MakeGenericType(x)));
                    break;
            }
            return services;
        }
        public static void UseRunner(this IApplicationBuilder app, BackgroundServiceType type)
        {
            switch (type)
            {
                case BackgroundServiceType.Coravel:
                    app.UseCoravel();
                    break;
            }
        }
        public static IServiceCollection WithStore(this IServiceCollection services, DatabaseProvider databaseProvider)
        {
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

        private static void UseCoravel(this IApplicationBuilder app)
        {
            var provider = app.ApplicationServices;
            provider.UseScheduler(scheduler =>
            {
                var blockLoggerTypes = _enabledUpdaters.Select(x => typeof(CoravelBlockLogger<>).MakeGenericType(x));

                var methods = typeof(IScheduler).GetMethods();
                var method = methods.Where(x => x.Name == nameof(IScheduler.Schedule)).FirstOrDefault(x => x.IsGenericMethod);
                if (method != null)
                {
                    blockLoggerTypes.ToList().ForEach(loggerType =>
                    {
                        var attributes = loggerType.GetCustomAttributes(true);
                        if (!attributes.Any(x => x.GetType() == typeof(DisabledAttribute)))
                        {
                            var generic = method.MakeGenericMethod(loggerType);
                            IScheduleInterval? interval = (IScheduleInterval?)generic.Invoke(scheduler, null);
                            if (interval == null)
                                throw new Exception("Initialization failed");
                            if (attributes.Any(x => x.GetType() == typeof(RunsEveryAttribute)))
                            {
                                var runsEvery = loggerType.GetCustomAttribute<RunsEveryAttribute>();
                                if (runsEvery != null)
                                {
                                    interval?.Cron(runsEvery.CronExpression);
                                }
                            }
                            else
                            {
                                interval?.EveryFifteenSeconds();
                            }
                        }
                    });
                }
                else throw new Exception("Couldn't find method");
            });
        }
    }
}
