using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.API.Security.Core.Humanity;
using ETHTPS.API.Security.Core.Humanity.Recaptcha;
using ETHTPS.Configuration;
using ETHTPS.Configuration.Database;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.DependencyInjection
{
    public static partial class CoreServicesExtensions
    {
        public static IServiceCollection AddMixedCoreServices(this IServiceCollection services) =>
            services.AddEssentialServices()
            .AddScoped<GeneralService>()
            .AddScoped<TimeWarpService>()
            .AddScoped<EthereumBlockTimeProvider>()
            .AddScoped<IExperimentService, ExperimentService>()
            .AddScoped<IInfoService, InfoService>()
            .AddScoped<IExternalWebsitesService, ExternalWebsitesService>()
            .AddScoped<IMarkdownService, MarkdownService>()
            .AddScoped<IProvidersService, ProvidersService>()
            .AddScoped<IChartDataServiceservice, ChartDataServiceservice>()
            .AddMSSQLHistoricalDataServices();

        /// <summary>
        /// Adds data providers (for TPS, GPS, GTPS) to the service collection
        /// </summary>
        /// <param name="databaseProvider">What kind of database should be used</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException">Self-explanatory</exception>
        public static IServiceCollection AddDataProviderServices(this IServiceCollection services, DatabaseProvider databaseProvider)
        {
            switch (databaseProvider)
            {
                case DatabaseProvider.MSSQL:
                    services.AddScoped<ITPSService, MSSQLTPSService>()
                            .AddScoped<IGPSService, MSSQLGPSService>()
                            .AddScoped<IGTPSService, MSSQLGasAdjustedTPSService>();
                    break;
                default:
                    throw new NotImplementedException($"{databaseProvider}");
            }
            return services
                .AddScoped<IPSDataFormatter, DeedleTimeSeriesFormatter>()
                .AddScoped<IAggregatedDataService, DependencyInjectionAggregatedDataservice>()
                .AddScoped<GeneralService>();
        }


        private static IServiceCollection AddEssentialServices(this IServiceCollection services) =>
            services.AddScoped<IHumanityCheckService, RecaptchaVerificationService>()
            .AddDbContext<ConfigurationContext>(options => options.UseSqlServer(GetConfigurationServiceConnectionString()), ServiceLifetime.Singleton)
            .AddSingleton<IDBConfigurationProvider, DBConfigurationProvider>()
            .AddScoped<IWebsiteStatisticsService, WebsiteStatisticsService>();
    }
}
