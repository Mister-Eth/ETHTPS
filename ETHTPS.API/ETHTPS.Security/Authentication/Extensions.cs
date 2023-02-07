using ETHTPS.API.Security.Core.APIKeyProvider;
using ETHTPS.API.Security.Core.APIKeys;
using ETHTPS.API.Security.Core.Humanity;
using ETHTPS.API.Security.Core.Humanity.Recaptcha;
using ETHTPS.API.Security.Core.Policies;
using ETHTPS.Configuration;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace ETHTPS.API.Security.Core.Authentication
{
    public static class Extensions
    {
        public static void AddPolicy(this AuthorizationOptions options, PolicyDescriptor descriptor) => options.AddPolicy(descriptor.Name, p => p.RequireClaim(descriptor.Value));

        public static IServiceCollection AddAPIKeyAuthenticationAndAuthorization(this IServiceCollection services)
        {
            services.AddAuthentication("APIKey").AddScheme<AuthenticationSchemeOptions, APIKeyAuthenticationSchemeHandler>("APIKey", opts =>
            {

            });
            services.AddAuthorizationCore(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder("APIKey")
                    .AddAuthenticationSchemes("APIKey")
                    .RequireAuthenticatedUser()
                    .Build();
                options.AddPolicy(PolicyConstants.EditorPolicy);
                options.AddPolicy(PolicyConstants.AdminPolicy);
            });
            return services;
        }
        public static IServiceCollection AddAPIKeyProvider(this IServiceCollection services)
        {
            services.TryAddScoped<IDBConfigurationProvider, DBConfigurationProvider>();
            return services.AddScoped<IRecaptchaVerificationService, RecaptchaVerificationService>()
            .AddScoped<IExtendedAPIKeyService, APIKeyServiceWithRecaptchaValidation>();
        }
    }
}
