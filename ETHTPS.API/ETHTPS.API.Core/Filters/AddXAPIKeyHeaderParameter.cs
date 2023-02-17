

using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

namespace ETHTPS.API.Core.Filters
{
    /// <summary>
    /// Adds an X-API-Key query parameter to ALL requests (except the one for API key creation)
    /// </summary>
    public class AddXAPIKeyHeaderParameter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            foreach (var path in swaggerDoc.Paths)
            {
                if (path.Key.Contains("RegisterNewKeyForProof"))
                    continue;

                path.Value.Parameters.Add(new OpenApiParameter()
                {
                    AllowEmptyValue = true,
                    Name = "X-API-Key",
                    In = ParameterLocation.Header,
                    Schema = new OpenApiSchema()
                    {
                        Type = "string"
                    }
                });
            }
        }
    }
}
