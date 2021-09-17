using ETHTPS.API.Infrastructure.Database.Models;

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
            services.AddDbContext<ETHTPSContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            var provider = services.BuildServiceProvider();
            var etherscanLogger= new EtherscanLogger(provider.GetRequiredService<ETHTPSContext>(), "Ethereum", configuration.GetSection("APIKeys").GetValue<string>("Etherscan"));
            etherscanLogger.LogDataAsync();
            var arbiscanLogger = new ArbiscanLogger(provider.GetRequiredService<ETHTPSContext>(), "Arbitrum One", configuration.GetSection("APIKeys").GetValue<string>("Arbiscan"));
            arbiscanLogger.LogDataAsync();
            while (true) { await Task.Delay(1); }
        }

        public static object LockObject = new object();
    }
}
