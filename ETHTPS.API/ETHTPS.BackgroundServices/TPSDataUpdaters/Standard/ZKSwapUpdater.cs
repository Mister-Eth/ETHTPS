using ETHTPS.BackgroundServices.TPSDataUpdaters;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions;

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
        public ZKSwapUpdater(ETHTPSContext context, ILogger<HangfireBackgroundService> logger) : base("ZKSwap", logger, context)
        {
            _httpClient = new HttpClient();
        }


        public override async Task<TPSData> LogDataAsync()
        {
            var data = default(TPSData);
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
                        var providerID = _context.Providers.First(x => x.Name == Name).Id;
                        if (!_context.TPSData.Any(x => x.Block == blockNumber && x.Provider == providerID))
                        {
                            var provider = _context.Providers.First(x => x.Name == Name);
                            DateTime currentBlockTime = DateTimeExtensions.FromUnixTime(long.Parse(block.committed_at.ToString()));
                            DateTime previousBlockTime = DateTimeExtensions.FromUnixTime(long.Parse(previousBlock.committed_at.ToString()));
                            data = new TPSData()
                            {
                                Date = currentBlockTime,
                                Provider = provider.Id,
                                Tps = double.Parse(block.transactions_number.ToString()) / currentBlockTime.Subtract(previousBlockTime).TotalSeconds,
                                Block = blockNumber
                            };
                            _context.TPSData.Add(data);
                            _context.SaveChanges();
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
            return data;
        }
    }
    
}
