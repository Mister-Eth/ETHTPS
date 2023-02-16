using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace ETHTPS.API.Core.Filters
{
    public sealed class PublicSwaggerFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            var nonPublicEndpoints = swaggerDoc.Paths
                .Where(x => !x.Key.ToLower().Contains("public"))
                .ToList();
            nonPublicEndpoints.ForEach(x => { swaggerDoc.Paths.Remove(x.Key); });
        }
    }
}
