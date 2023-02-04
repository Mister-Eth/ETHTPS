using ETHTPS.API.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System.IO;
using System.Reflection;

namespace ETHTPS.API.Tests
{
    public static class DependencyContainer
    {
        private static readonly ServiceProvider _serviceProvider;
        static DependencyContainer()
        {
            var services = new ServiceCollection();
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location))
                .AddJsonFile("appsettings.json")
                .Build();
            Startup startup = new(configuration);
            startup.ConfigureServices(services);
            services.AddScoped<GeneralController>();
            services.AddScoped<GPSController>();
            services.AddScoped<GasAdjustedTPSController>();
            services.AddScoped<StatusController>();
            services.AddScoped<TimeWarpController>();
            _serviceProvider = services.BuildServiceProvider();
        }

        public static ServiceProvider GetServiceProvider() => _serviceProvider;
    }
}
