using ETHTPS.API.Infrastructure.BackgroundServices.IntervalDataUpdaters;
using ETHTPS.API.Infrastructure.Database.Models;

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

namespace ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters.Standard
{
    public class XDAIUpdater : TPSDataUpdaterBase
    {
        private readonly HttpClient _httpClient;
        public XDAIUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger) : base("XDAI", scopeFactory, logger, TimeSpan.FromSeconds(5))
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

        public override async Task LogDataAsync(ETHTPSContext context)
        {
            try
            {
                var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://blockscout.com/xdai/mainnet/blocks?type=JSON"));
                var latest = obj.items[0].ToString();
                var secondLatest = obj.items[1].ToString();
                var n1 = GetTransactionCount(latest);
                var provider = context.Providers.First(x => x.Name == Name);
                var data = new TPSData()
                {
                    Date = DateTime.Now,
                    Provider = provider.Id,
                    Tps = (double)n1 / 5 //5s block time
                };
                context.Tpsdata.Add(data);
                context.SaveChanges();
                _logger.LogInformation($"{Name}: {data.Tps}TPS");
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
        }

    }
    public static class StringExtender
    {
        public static int IndexOfOccurence(this string s, string match, int occurence)
        {
            int i = 1;
            int index = 0;

            while (i <= occurence && (index = s.IndexOf(match, index + 1)) != -1)
            {
                if (i == occurence)
                    return index;

                i++;
            }

            return -1;
        }
    }
}
