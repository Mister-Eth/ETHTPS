using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

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
            services.AddScoped<Controllers.GeneralController>();
            services.AddScoped<Controllers.TPSController>();
            services.AddScoped<Controllers.GPSController>();
            services.AddScoped<Controllers.GasAdjustedTPSController>();
            services.AddScoped<Controllers.StatusController>();
            services.AddScoped<Controllers.TimeWarpController>();
            _serviceProvider = services.BuildServiceProvider();
        }

        public static ServiceProvider GetServiceProvider() => _serviceProvider;
    }
}
