using ETHTPS.API.Core.Filters;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.DependencyInjection
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services, bool usePublicFilter = false) => services.AddSwaggerGen(c =>
        {
            if (usePublicFilter)
            {
                c.DocumentFilter<PublicSwaggerFilter>();
            }
            c.DocumentFilter<AddXAPIKeyHeaderParameter>();
            c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
        }).AddSwaggerGenNewtonsoftSupport();

        public static IApplicationBuilder ConfigureSwagger(this IApplicationBuilder app) => app.UseSwagger()
            .UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "ETHTPS API V3");
            c.RoutePrefix = string.Empty;
        });
    }
}
