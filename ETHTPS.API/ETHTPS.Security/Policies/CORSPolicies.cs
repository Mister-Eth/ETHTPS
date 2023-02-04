using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.Security.Policies
{
    public static class CORSPolicies
    {
        private static readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public static IServiceCollection AddCustomCORSPolicies(this IServiceCollection services) => services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://ethtps.info");
                          builder.WithOrigins("https://ultrasound.money/");
                          builder.WithOrigins("http://localhost:3007");
#if DEBUG
                          builder.WithOrigins("http://10.2.0.18");
#endif
                          builder.AllowAnyHeader();
                      });
        });
    }
}
