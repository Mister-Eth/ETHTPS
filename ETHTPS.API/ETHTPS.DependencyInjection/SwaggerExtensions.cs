using ETHTPS.API.Core.Filters;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

using System.Reflection;
using System.Xml.Linq;

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
            c.DocumentFilter<PolymorphismDocumentFilter<DatedXYDataPoint>>();
            c.DocumentFilter<PolymorphismDocumentFilter<NumericXYDataPoint>>();
            c.DocumentFilter<PolymorphismDocumentFilter<StringXYDataPoint>>();
            c.DocumentFilter<PolymorphismDocumentFilter<ProviderDatedXYDataPoint>>();
            c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

            c.SwaggerDoc("v3", new OpenApiInfo
            {
                Version = "v3",
                Title = "ETHTPS.info API",
                Description = "Backend definition for ethtps.info; you're free to play around",
                //TermsOfService = new Uri("https://ethtps.info/terms"),
                Contact = new OpenApiContact
                {
                    Name = "Mister_Eth",
                    Url = new Uri("https://twitter.com/Mister_Eth")
                }
            });
            var directory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var xmlFilename = $"ETHTPS.API.Core.xml";
            var inFile = Path.Combine(directory ?? string.Empty, xmlFilename);
            if (File.Exists(inFile))
            {
                var outFile = Path.Combine(directory ?? string.Empty, "ETHTPS.API.xml");
                File.WriteAllText(outFile, File.ReadAllText(inFile).Replace("ETHTPS.API.Core", "ETHTPS.API"));
                c.IncludeXmlComments(inFile, true);
            }
        }).AddSwaggerGenNewtonsoftSupport();

        public static IApplicationBuilder ConfigureSwagger(this IApplicationBuilder app) => app.UseSwagger()
            .UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v3/swagger.json", "ETHTPS API V3");
            c.RoutePrefix = string.Empty;
        });
    }
}
