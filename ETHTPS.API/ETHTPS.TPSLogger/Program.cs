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

            var defaultSelector = "#ContentPlaceHolder1_mainboxes > div > div > div.col-md-6.col-lg-4.u-ver-divider.u-ver-divider--left.u-ver-divider--none-md > div:nth-child(1) > div.media-body > span";

            var etherscanLogger= new EtherscanHTTPTPSLoggerBase(provider.GetRequiredService<ETHTPSContext>(), "Ethereum", "https://etherscan.io/", defaultSelector );
            etherscanLogger.LogDataAsync();
            var arbiscanLogger = new ArbiscanHTTPTPSLoggerBase(provider.GetRequiredService<ETHTPSContext>(), "Arbitrum One", "https://arbiscan.io/", "#ContentPlaceHolder1_mainboxes > div > div > div.col-md-6.col-lg-4.u-ver-divider.u-ver-divider--left.u-ver-divider--none-md > div:nth-child(1) > div.text-right > span");
            arbiscanLogger.LogDataAsync();
            var polygonscanLogger = new PolygonscanHTTPTPSLoggerBase(provider.GetRequiredService<ETHTPSContext>(), "Polygon", "https://polygonscan.com/", "#ContentPlaceHolder1_mainboxes > div > div > div.col-md-6.col-lg-4.u-ver-divider.u-ver-divider--left.u-ver-divider--none-md > div:nth-child(3) > div.media-body > span");
            polygonscanLogger.LogDataAsync();
            var optimismScanLogger = new OptimismHTTPTPSLoggerBase(provider.GetRequiredService<ETHTPSContext>(), "Optimism", "https://optimistic.etherscan.io/", defaultSelector);
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
