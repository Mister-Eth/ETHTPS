using ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;

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
    public class AVAXCChainUpdater : TPSDataUpdaterBase
    {
        private readonly HttpClient _httpClient;
        public AVAXCChainUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger) : base("AVAX C-chain", scopeFactory, logger, TimeSpan.FromSeconds(5))
        {
            _httpClient = new HttpClient();
        }

        private static int GetBlockNumber(string html)
        {
            var str = "data-block-number";
            var index = html.IndexOfOccurence(str, 1);
            var str2 = "data-block-hash";
            var lineBreakIndex = html.IndexOf(str2);
            var targetString = html.Substring(index + str.Length + 2, (lineBreakIndex - index) - 4 - str2.Length);
            return int.Parse(new string(targetString.Where(char.IsDigit).ToArray()));
        }

        private async Task<AVAXBlockInfo> GetBlockInfoAsync(int block)
        {
            return null;
        }

        public override async Task<TPSData> LogDataAsync(ETHTPSContext context)
        {
            var data = default(TPSData);
            try
            {
                var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://cchain.explorer.avax.network/blocks?type=JSON"));
                var latest = obj.items[0].ToString();
                var secondLatest = obj.items[1].ToString();
                var latestBlock = await GetBlockInfoAsync(GetBlockNumber(latest));
                var secondLatestBlock = await GetBlockInfoAsync(GetBlockNumber(secondLatest));
                
                var provider = context.Providers.First(x => x.Name == Name);
                data = new TPSData()
                {
                    Date = DateTime.Now,
                    Provider = provider.Id,
                    Tps = latestBlock.TransactionCount / (latestBlock.Time.Subtract(secondLatestBlock.Time).TotalSeconds)
                };
                context.Tpsdata.Add(data);
                context.SaveChanges();
                _logger.LogInformation($"{Name}: {data.Tps}TPS");
                
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
            return data;
        }

        private class AVAXBlockInfo
        {
            public int TransactionCount { get; set; }

            public DateTime Time { get; set; }
        }
    }
}
