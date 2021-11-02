using ETHTPS.BackgroundServices.TPSDataUpdaters;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;
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
    public class BobaNetworkUpdater : TPSDataUpdaterBase
    {
        private const string NAME = "Boba Network";
        private readonly HttpClient _httpClient;
        private readonly string _transactionCountSelector;
        private readonly string _dateSelector;
        public BobaNetworkUpdater(ETHTPSContext context, ILogger<HangfireBackgroundService> logger, IConfiguration configuration, ETHTPSContext _context) : base(NAME, logger, _context)
        {
            var config = configuration.GetSection("TPSLoggerConfigurations").GetSection("StandardLoggerConfiguration").GetSection(NAME);
            _transactionCountSelector = config.GetValue<string>("TransactionCountSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
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

        private Task<BlockInfo> GetBlockInfoAsync(int block)
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load($"https://blockexplorer.boba.network/blocks/{block}/transactions");
            var txCountNode = doc.DocumentNode.QuerySelectorAll(_transactionCountSelector);
            var txCount = new string(string.Join(" ",txCountNode.Select(x => x.InnerText)).Where(Char.IsNumber).ToArray());

            var dateNode = doc.DocumentNode.QuerySelectorAll(_dateSelector);
            var date = string.Join(" ", dateNode.Select(x => x.Attributes["data-from-now"].Value));
            return Task.FromResult(new BlockInfo()
            {
                TransactionCount = int.Parse(txCount),
                Time = DateTime.Parse(date)
            });
        }

        public override async Task<TPSData> GetDataAsync()
        {
            var data = default(TPSData);
            try
            {
                var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://blockexplorer.boba.network/blocks?type=JSON"));
                var latest = obj.items[0].ToString();
                var secondLatest = obj.items[1].ToString();
                var latestBlock = await GetBlockInfoAsync(GetBlockNumber(latest));
                var secondLatestBlock = await GetBlockInfoAsync(GetBlockNumber(secondLatest));
                
                var provider = _context.Providers.First(x => x.Name == Name);
                data = new TPSData()
                {
                    Date = DateTime.Now,
                    Provider = provider.Id,
                    Tps = (float)latestBlock.TransactionCount / (float)(latestBlock.Time.Subtract(secondLatestBlock.Time).TotalSeconds)
                };
                
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
            return data;
        }
    }
}
