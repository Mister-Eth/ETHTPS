using ETHTPS.API.Infrastructure.Database.Models;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ETHTPS.TPSLogger.TPSLogging
{
    public class XDAITPSLogger : TPSLoggerBase
    {
        private readonly HttpClient _httpClient;
        public XDAITPSLogger(ETHTPSContext context, string name) : base(context, name)
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

        public override async void LogDataAsync()
        {
            while (true)
            {
                try
                {
                    var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://blockscout.com/xdai/mainnet/blocks?type=JSON"));
                    var latest = obj.items[0].ToString();
                    var secondLatest = obj.items[1].ToString();
                    var n1 = GetTransactionCount(latest);
                    lock (Program.LockObject)
                    {
                        var provider = Context.Providers.First(x => x.Name == Name);
                        var data = new TPSData()
                        {
                            Date = DateTime.Now,
                            Provider = provider.Id,
                            Tps = n1 / 5 //5s block time
                        };
                        Context.Tpsdata.Add(data);
                        Context.SaveChanges();
                        Console.WriteLine($"{Name}: {data.Tps}TPS");
                    }
                    ;
                }
                catch (Exception e)
                {
                    Console.WriteLine($"{Name}: {e.Message}");
                }
                await Task.Delay(TimeSpan.FromSeconds(5));
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
