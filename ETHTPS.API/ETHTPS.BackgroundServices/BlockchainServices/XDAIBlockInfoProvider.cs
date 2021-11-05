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
    [Provider("XDAI")]
    public class XDAIBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        private readonly string _transactionCountSelector;
        private readonly string _dateSelector;
        private readonly string _gasSelector;
        public XDAIBlockInfoProvider(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            var config = configuration.GetSection("TPSLoggerConfigurations").GetSection("StandardLoggerConfiguration").GetSection("XDAI");
            _transactionCountSelector = config.GetValue<string>("TransactionCountSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
            _gasSelector = config.GetValue<string>("GasSelector");
        }

        public double BlockTimeSeconds { get; set; } = 5.2;

        private static int GetTransactionCountFromHTML(string html)
        {
            var secondIndex = html.IndexOfOccurence("transactions", 2);
            var lineBreakIndex = html.Substring(0, secondIndex).LastIndexOf(">");
            var targetString = html.Substring(lineBreakIndex + 2, secondIndex - 1 - (lineBreakIndex + 2));
            return int.Parse(targetString);
        }

        private static int GetLatestBlockNumberFromHTML(string html)
        {
            return int.Parse(html.Between("data-block-number", "data-block-hash").RemoveAllNonNumericCharacters());
        }

        public Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load($"https://blockscout.com/xdai/mainnet/block/{blockNumber}/transactions");

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
            var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://blockscout.com/xdai/mainnet/blocks?type=JSON"));
            return await GetBlockInfoAsync(GetLatestBlockNumberFromHTML(obj.items[0].ToString()));
        }
    }
}
