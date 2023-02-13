using ETHTPS.Configuration;
using ETHTPS.Data.Integrations.MSSQL;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ETHTPS.API.DependencyInjection
{
    public static class DatabaseExtensions
    {
        public static string GetDefaultConnectionString(this IServiceCollection services, string appName) => services.GetConnectionString(appName, "ConnectionString");
        public static string GetConnectionString(this IServiceCollection services, string appName, string connectionStringName)
        {
            using (var built = services.BuildServiceProvider())
            {
                var provider = built.GetRequiredService<IDBConfigurationProvider>();
                return provider.GetConfigurationStringsForMicroservice(appName).First(x => x.Name == connectionStringName).Value;
            }
        }
        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, string appName)
        {
            services.AddDbContext<EthtpsContext>(options => options.UseSqlServer(services.GetDefaultConnectionString(appName)), ServiceLifetime.Scoped);
            return services;

        }
    }
}
