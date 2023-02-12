﻿using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.Core.Integrations.MSSQL.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.API.Security.Core.Humanity;
using ETHTPS.API.Security.Core.Humanity.Recaptcha;
using ETHTPS.Configuration;
using ETHTPS.Configuration.Database;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Models.Markdown;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.BlockchainServices.Status;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.DependencyInjection
{
    public static partial class CoreServicesExtensions
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services) =>
            services.AddEssentialServices()
            .AddScoped<TPSService>()
            .AddScoped<GPSService>()
            .AddScoped<GasAdjustedTPSService>()
            .AddScoped<GeneralService>()
            .AddScoped<TimeWarpService>()
            .AddScoped<EthereumBlockTimeProvider>()
            .AddScoped<IExperimentService, ExperimentService>()
            .AddScoped<IInfoService, InfoService>()
            .AddScoped<IExternalWebsitesService<ExternalWebsite>, ExternalWebsitesService>()
            .AddScoped<IMarkdownService<MarkdownPage>, MarkdownService>()
            .AddScoped<IProvidersService<Data.Integrations.MSSQL.Provider>, ProvidersService>()
            .AddScoped<IChartDataProviderService, ChartDataProviderService>()
            .AddHistoricalDataProviders();

        private static IServiceCollection AddEssentialServices(this IServiceCollection services) =>
            services.AddScoped<IHumanityCheckService, RecaptchaVerificationService>()
            .AddDbContext<ConfigurationContext>(options => options.UseSqlServer(GetConfigurationServiceConnectionString()), ServiceLifetime.Singleton)
            .AddSingleton<IDBConfigurationProvider, DBConfigurationProvider>()
            ;
    }
}
