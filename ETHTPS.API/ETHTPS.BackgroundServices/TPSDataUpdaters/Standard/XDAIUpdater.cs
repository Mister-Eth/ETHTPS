using ETHTPS.BackgroundServices.TPSDataUpdaters;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters.Standard
{
    public class XDAIUpdater : TPSDataUpdaterBase
    {
        private readonly HttpClient _httpClient;
        public XDAIUpdater(ETHTPSContext context, ILogger<HangfireBackgroundService> logger) : base("XDAI", logger, context)
        {
            _httpClient = new HttpClient();
        }

        private static int GetTransactionCount(string html)
        {
            var secondIndex = html.IndexOfOccurence("transactions", 2);
            var lineBreakIndex = html.Substring(0, secondIndex).LastIndexOf(">");
            var targetString = html.Substring(lineBreakIndex + 2, secondIndex - 1 - (lineBreakIndex + 2));
            return int.Parse(targetString);
        }

        public override async Task<TPSData> LogDataAsync()
        {
            var data = default(TPSData);
            try
            {
                var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://blockscout.com/xdai/mainnet/blocks?type=JSON"));
                var latest = obj.items[0].ToString();
                var secondLatest = obj.items[1].ToString();
                var n1 = GetTransactionCount(latest);
                var provider = _context.Providers.First(x => x.Name == Name);
                data = new TPSData()
                {
                    Date = DateTime.Now,
                    Provider = provider.Id,
                    Tps = (double)n1 / 5.2 //block time
                };
                _context.Tpsdata.Add(data);
                _context.SaveChanges();
                _logger.LogInformation($"{Name}: {data.Tps}TPS");
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
            return data;
        }

    }
}
