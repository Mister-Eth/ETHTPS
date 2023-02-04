using ETHTPS.API.Core.Infrastructure.Services.Experimentation;
using ETHTPS.API.Core.Infrastructure.Services.ExternalWebsites;
using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.API.Core.Infrastructure.Services.Info;
using ETHTPS.API.Core.Infrastructure.Services.Markdown;
using ETHTPS.API.Core.Infrastructure.Services.Recaptcha;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.BlockchainServices.Status;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.API.DependencyInjection
{
    public static class CoreServicesExtensions
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<TPSService>();
            services.AddScoped<GPSService>();
            services.AddScoped<GasAdjustedTPSService>();
            services.AddScoped<GeneralService>();
            services.AddScoped<TimeWarpService>();
            services.AddScoped<IBlockInfoProviderStatusService, BlockInfoProviderStatusService>();
            services.AddScoped<EthereumBlockTimeProvider>();
            services.AddScoped<IExperimentService, ExperimentService>();
            services.AddScoped<IInfoService, InfoService>();
            services.AddScoped<IRecaptchaVerificationService, RecaptchaVerificationService>();
            services.AddScoped<IExternalWebsitesService, ExternalWebsitesService>();
            services.AddScoped<IMarkdownService, MarkdownService>();
            services.AddScoped<IProvidersService, ProvidersService>();
            return services;
        }
    }
}
