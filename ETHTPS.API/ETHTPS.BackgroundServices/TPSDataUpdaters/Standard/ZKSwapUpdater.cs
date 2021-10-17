using ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters;
using ETHTPS.Data.Database;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters.Standard
{
    public class ZKSwapUpdater : TPSDataUpdaterBase
    {
        private readonly HttpClient _httpClient;
        public ZKSwapUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger) : base("ZKSwap", scopeFactory, logger, TimeSpan.FromMinutes(1))
        {
            _httpClient = new HttpClient();
        }

        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        private static DateTime FromUnixTime(long unixTime)
        {
            return epoch.AddSeconds(unixTime);
        }

        public override async Task LogDataAsync(ETHTPSContext context)
        {
            try
            {
                var blocks = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://api.zkswap.info/v2/blocks?start=0&limit=50"));
                for (int i = 0; i < blocks.data.data.Count - 1; i++)
                {
                    var block = blocks.data.data[i];
                    if (block.status == "verified")
                    {
                        var previousBlock = blocks.data.data[i + 1];
                        string blockNumber = block.number.ToString();
                        var providerID = context.Providers.First(x => x.Name == Name).Id;
                        if (!context.Tpsdata.Any(x => x.Block == blockNumber && x.Provider == providerID))
                        {
                            var provider = context.Providers.First(x => x.Name == Name);
                            DateTime currentBlockTime = FromUnixTime(long.Parse(block.committed_at.ToString()));
                            DateTime previousBlockTime = FromUnixTime(long.Parse(previousBlock.committed_at.ToString()));
                            var data = new TPSData()
                            {
                                Date = currentBlockTime,
                                Provider = provider.Id,
                                Tps = double.Parse(block.transactions_number.ToString()) / currentBlockTime.Subtract(previousBlockTime).TotalSeconds,
                                Block = blockNumber
                            };
                            context.Tpsdata.Add(data);
                            context.SaveChanges();
                            _logger.LogInformation($"{Name}: {data.Tps}TPS");
                            break;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
        }
    }
    
}
