using ETHTPS.API.Core.Infrastructure.Services.Experimentation;
using ETHTPS.API.Core.Infrastructure.Services.ExternalWebsites;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.Core.Infrastructure.Services.Info;
using ETHTPS.API.Core.Infrastructure.Services.Markdown;
using ETHTPS.API.Core.Infrastructure.Services.Recaptcha;
using ETHTPS.Configuration;
using ETHTPS.Configuration.Database;
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
            .AddScoped<IBlockInfoProviderStatusService, BlockInfoProviderStatusService>()
            .AddScoped<EthereumBlockTimeProvider>()
            .AddScoped<IExperimentService, ExperimentService>()
            .AddScoped<IInfoService, InfoService>()
            .AddScoped<IExternalWebsitesService, ExternalWebsitesService>()
            .AddScoped<IMarkdownService, MarkdownService>()
            .AddScoped<IProvidersService, ProvidersService>()
            .AddHistoricalDataProviders();

        public static IServiceCollection AddEssentialServices(this IServiceCollection services) =>
            services.AddScoped<IRecaptchaVerificationService, RecaptchaVerificationService>()
            .AddDbContext<ConfigurationContext>(options => options.UseSqlServer(GetConfigurationServiceConnectionString()), ServiceLifetime.Singleton)
            .AddSingleton<IDBConfigurationProvider, DBConfigurationProvider>()
            ;
    }
}
