using ETHTPS.Data.Extensions.StringExtensions;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("AVAX C-chain")]
    [Obsolete("This implementation is obsolete. Please use SnowtraceBlockInfoProvider.",error: true)]
    public class AVAXCChainBlockInfoProvider : IBlockInfoProvider
    {
        private const string NAME = "AVAX C-chain";
        private readonly HttpClient _httpClient;
        private readonly string _transactionCountSelector;
        private readonly string _dateSelector;
        private readonly string _gasSelector;

        public double BlockTimeSeconds { get; set; }

        public AVAXCChainBlockInfoProvider(IConfiguration configuration)
        {
            var config = configuration.GetSection("TPSLoggerConfigurations").GetSection("StandardLoggerConfiguration").GetSection(NAME);
            _transactionCountSelector = config.GetValue<string>("TransactionCountSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
            _gasSelector = config.GetValue<string>("GasSelector");
            _httpClient = new HttpClient();
        }

        private static int GetBlockNumberFromHTML(string html)
        {
            var str = "data-block-number";
            var index = html.IndexOfOccurence(str, 1);
            var str2 = "data-block-hash";
            var lineBreakIndex = html.IndexOf(str2);
            var targetString = html.Substring(index + str.Length + 2, (lineBreakIndex - index) - 4 - str2.Length);
            return int.Parse(new string(targetString.Where(char.IsDigit).ToArray()));
        }

        public Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load($"https://cchain.explorer.avax.network/block/{blockNumber}/transactions");
            var txCountNode = doc.DocumentNode.QuerySelectorAll(_transactionCountSelector);
            var txCount = new string(string.Join(" ", txCountNode.Select(x => x.InnerText)).Where(Char.IsNumber).ToArray());

            var gasNode = doc.DocumentNode.QuerySelectorAll(_gasSelector);
            var gas = new string(string.Join(" ", gasNode.Select(x => x.InnerText.Substring(0, x.InnerText.IndexOf("|")))).Where(Char.IsNumber).ToArray());

            var dateNode = doc.DocumentNode.QuerySelectorAll(_dateSelector);
            var date = string.Join(" ", dateNode.Select(x => x.Attributes["data-from-now"].Value));
            return Task.FromResult(new BlockInfo()
            {
                TransactionCount = int.Parse(txCount),
                Date = DateTime.Parse(date),
                BlockNumber = blockNumber,
                GasUsed = double.Parse(gas)
            });
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://cchain.explorer.avax.network/blocks?type=JSON"));
            var latest = obj.items[0].ToString();
            return await GetBlockInfoAsync(GetBlockNumberFromHTML(latest));
        }
    }
}
