using ETHTPS.Configuration;
using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ETHTPS.API.DependencyInjection
{
    public static class DatabaseExtensions
    {
        public static string GetDefaultConnectionString(this IServiceCollection services, string appName)
        {
            using (var built = services.BuildServiceProvider())
            {
                var provider = built.GetRequiredService<IDBConfigurationProvider>();
                return provider.GetConfigurationStringsForMicroservice(appName).First(x => x.Name == "ConnectionString").Value;
            }
        }
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, string appName)
        {
            services.AddDbContext<EthtpsContext>(options => options.UseSqlServer(services.GetDefaultConnectionString(appName)), ServiceLifetime.Transient);
            return services;

        }
    }
}
