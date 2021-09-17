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
            UpdateMainnetTPS(provider.GetRequiredService<ETHTPSContext>(), configuration.GetSection("APIKeys").GetValue<string>("Etherscan"));
            while (true) { await Task.Delay(1); }
        }

        private static async void UpdateMainnetTPS(ETHTPSContext context, string apiKey)
        {
            while (true)
            {
                var client = new HttpClient();
                try
                {
                    int latestBlock = HexToDec(JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync($"https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey={apiKey}")).result.ToString());
                    int blockTransactions = HexToDec(JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync($"https://api.etherscan.io/api?module=proxy&action=eth_getBlockTransactionCountByNumber&apikey={apiKey}&tag={latestBlock.ToString("X")}")).result.ToString());

                    var provider = context.Providers.First(x => x.Name == "Ethereum");
                    var data = new TPSData()
                    {
                        Block = latestBlock.ToString(),
                        Date = DateTime.Now,
                        Provider = provider.Id,
                        Tps = (int)(Math.Ceiling(blockTransactions / 13.1))
                    };
                    if (!context.Tpsdata.Any(x => x.Provider.Value == provider.Id && x.Block == latestBlock.ToString()))
                    {
                        context.Tpsdata.Add(data);
                    }
                    context.SaveChanges();
                    Console.WriteLine($"Block {latestBlock} transaction count: {blockTransactions} ({data.Tps} tps)");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                await Task.Delay(10000);
            }
        }

        private static DateTime LatestBlockTimeUpdate = DateTime.MinValue;
        private static double LatestBlockTime = 0;
        private static async Task<double> GetEthereumLatestBlockTime()
        {
            if (DateTime.Now.Subtract(LatestBlockTimeUpdate).TotalMinutes > 1)
            {
                LatestBlockTimeUpdate = DateTime.Now;
                var client = new HttpClient();
                try
                {
                    var latest = JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync("https://api.blockcypher.com/v1/eth/main")).latest_url;
                    var data = JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync(latest.ToString()));
                    var t1 = (DateTime)data.time;
                    var data2 = JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync(data.prev_block_url.ToString()));
                    var t2 = (DateTime)data2.time;
                    LatestBlockTime = t1.Subtract(t2).TotalSeconds;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return LatestBlockTime;
        }

        private static int HexToDec(string hex)
        {
            return int.Parse(hex.Replace("0x", string.Empty), System.Globalization.NumberStyles.HexNumber);
        }
    }
}
