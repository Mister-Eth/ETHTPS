using ETHTPS.API.Infrastructure.Database.Models;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.TPSLogger.TPSLogging.ScanLogger
{
    public abstract class ScanTPSLoggerBase : TPSLoggerBase
    {
        private readonly string _websiteName;
        private readonly string _apiKey;

        protected ScanTPSLoggerBase(API.Infrastructure.Database.Models.ETHTPSContext context, string name, string apiKey, string websiteName) : base(context, name)
        {
            _websiteName = websiteName;
            _apiKey = apiKey;
        }

        public override async void LogDataAsync()
        {
            while (true)
            {
                var client = new HttpClient();
                try
                {
                    int latestBlock = HexToDec(JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync($"https://api.{_websiteName}.io/api?module=proxy&action=eth_blockNumber&apikey={_apiKey}")).result.ToString());
                    int blockTransactions = HexToDec(JsonConvert.DeserializeObject<dynamic>(await client.GetStringAsync($"https://api.{_websiteName}.io/api?module=proxy&action=eth_getBlockTransactionCountByNumber&apikey={_apiKey}&tag={latestBlock.ToString("X")}")).result.ToString());
                    lock (Program.LockObject)
                    {
                        var provider = Context.Providers.First(x => x.Name == "Ethereum");
                        var data = new TPSData()
                        {
                            Block = latestBlock.ToString(),
                            Date = DateTime.Now,
                            Provider = provider.Id,
                            Tps = (int)(Math.Ceiling(blockTransactions / 13.1))
                        };
                        if (!Context.Tpsdata.Any(x => x.Provider.Value == provider.Id && x.Block == latestBlock.ToString()))
                        {
                            Context.Tpsdata.Add(data);
                        }
                        Context.SaveChanges();
                        Console.WriteLine($"{Name} block {latestBlock} transaction count: {blockTransactions} ({data.Tps} tps)");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                await Task.Delay(10000);
            }
        }
        private static int HexToDec(string hex)
        {
            return int.Parse(hex.Replace("0x", string.Empty), System.Globalization.NumberStyles.HexNumber);
        }
    }
}
