using ETHTPS.Security.Policies;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.Authentication
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
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes("APIKey")
                    .RequireAuthenticatedUser()
                    .Build();
                options.AddPolicy(PolicyConstants.EditorPolicy);
                options.AddPolicy(PolicyConstants.AdminPolicy);
            });
            return services;
        }
    }
}
