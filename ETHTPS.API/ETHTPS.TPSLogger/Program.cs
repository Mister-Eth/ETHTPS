using ETHTPS.API.Infrastructure.Database.Models;
using ETHTPS.TPSLogger.TPSLogging;
using ETHTPS.TPSLogger.TPSLogging.HttpLogger;
using ETHTPS.TPSLogger.TPSLogging.ScanLogger;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Newtonsoft.Json;

using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;

namespace ETHTPS.TPSLogger
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var services = new ServiceCollection();
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location))
            .AddJsonFile("appsettings.json")
            .Build();
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient);
            var provider = services.BuildServiceProvider();

            optimismScanLogger.LogDataAsync();
            var xdaiLogger = new XDAITPSLogger(provider.GetRequiredService<ETHTPSContext>(), "XDAI");
            xdaiLogger.LogDataAsync();
            var zkSwapLogger = new ZKSwapTPSLogger(provider.GetRequiredService<ETHTPSContext>(), "ZKSwap");
            zkSwapLogger.LogDataAsync();
            var zkSyncLogger = new ZKSyncTPSLogger(provider.GetRequiredService<ETHTPSContext>(), "ZKSync");
            zkSyncLogger.LogDataAsync();
            while (true) { await Task.Delay(1); }
        }
    }
}
