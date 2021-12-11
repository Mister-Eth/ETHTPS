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
    [Provider("Ronin")]
    public class RoninBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseURL;
        private readonly string _txSummaryPath;
        private readonly string _blockHeightSelector;
        private readonly string _transactionCountSelector;
        private readonly string _dateSelector;
        private readonly string _gasSelector;

        public RoninBlockInfoProvider(IConfiguration configuration)
        {
            var config = configuration.GetSection("BlockInfoProviders").GetSection("Ronin");
            _baseURL = config.GetValue<string>("BaseURL");
            _txSummaryPath = config.GetValue<string>("TXSummaryPath");
            _blockHeightSelector = config.GetValue<string>("BlockHeightSelector");
            _transactionCountSelector = config.GetValue<string>("TXCountSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
            _gasSelector = config.GetValue<string>("GasUsedSelector");
            _httpClient = new HttpClient();
        }
        public double BlockTimeSeconds { get; set; } = 3;

        public Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            HtmlWeb web = new HtmlWeb();
            //HtmlDocument doc = web.Load($"{_baseURL}/block/{blockNumber}");

            var txPage = web.Load($"{_baseURL}/block/{blockNumber}/txs");
            var txCountNode = txPage.DocumentNode.QuerySelectorAll(_transactionCountSelector);
            var txCount = new string(string.Join(" ", txCountNode.Select(x => x.InnerText)).Where(Char.IsNumber).ToArray());

            return Task.FromResult(new BlockInfo()
            {
                BlockNumber = blockNumber,
                TransactionCount = int.Parse(txCount)
            }); 
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load($"{_baseURL}/blocks");

            var blockHeightNode = doc.DocumentNode.QuerySelectorAll(_blockHeightSelector);
            var blockHeight = string.Join(" ", blockHeightNode.Select(x => x.InnerText));

            var result = await GetBlockInfoAsync(int.Parse(blockHeight) - 1);
            result.Date = DateTime.Now;
            return result;
        }


        public class TxSummaryResponse
        {
            public TxSummaryPageprops pageProps { get; set; }
            public bool __N_SSG { get; set; }
        }

        public class TxSummaryPageprops
        {
            public Overviewdata overviewData { get; set; }
            public Txchartdata txChartData { get; set; }
        }

        public class Overviewdata
        {
            public int blockTime { get; set; }
            public int totalAddresses { get; set; }
            public int totalBlocks { get; set; }
            public int totalTxs { get; set; }
        }

        public class Txchartdata
        {
            public int[] txCount { get; set; }
            public string[] label { get; set; }
        }

    }
}
