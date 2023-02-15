using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Scan.Extensions;
using ETHTPS.Data.Core.Models.DataEntries;
using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum.Scan
{
    public abstract class ScanBlockInfoProviderBase : IBlockInfoProvider
    {
        protected readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _blockInfoEndpointBase;
        private readonly ScanRequestModelFactory _requestModelFactory;
        private readonly string _txCountSelector;
        private readonly string _gasUsedSelector;
        private readonly string _dateSelector;
        private readonly string _providerName;

        protected ScanBlockInfoProviderBase(IConfiguration configuration, string providerName)
        {
            _providerName = providerName;
            var config = configuration.GetSection("BlockInfoProviders").GetSection(providerName);
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(config.GetValue<string>("Endpoint"))
            };
            _apiKey = config.GetValue<string>("APIKey");
            _requestModelFactory = new ScanRequestModelFactory(_apiKey);
            _blockInfoEndpointBase = config.GetValue<string>("BlockInfoEndpointBase");
            _txCountSelector = config.GetValue<string>("TXCountSelector");
            _gasUsedSelector = config.GetValue<string>("GasUsedSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
            if (config.GetSection("BlockTime").Exists())
            {
                BlockTimeSeconds = config.GetValue<double>("BlockTime");
            }
        }

        public double BlockTimeSeconds { get; set; }

        public Task<Block> GetBlockInfoAsync(int blockNumber)
        {

            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load(_blockInfoEndpointBase + blockNumber);
            if (_providerName == "Optimistic Ethereum") {; }
            var txCountNode = doc.DocumentNode.QuerySelectorAll(_txCountSelector);
            var txCount = new string(txCountNode.First().InnerText.RemoveAllNonNumericCharacters());

            string gasUsed = "0";
            if (!string.IsNullOrWhiteSpace(_gasUsedSelector))
            {
                var gasUsedNode = doc.DocumentNode.QuerySelectorAll(_gasUsedSelector);
                gasUsed = new string(gasUsedNode.First().InnerText.UntilParanthesis().RemoveAllNonNumericCharacters());
            }

            var dateNode = doc.DocumentNode.QuerySelectorAll(_dateSelector);
            var dateString = dateNode.First().InnerText.BetweenParantheses().Replace(" +UTC", "");
            DateTime date;
            //(Sep-17-2021 06:40:08 AM +UTC) 
            if (DateTime.TryParseExact(dateString, "MMM-dd-yyyy hh:mm:ss tt", null, System.Globalization.DateTimeStyles.None, out date))
            {

            }

            var transactionCount = int.Parse(txCount);
            if (_providerName == "Arbiscan")
            {
                // There is a StartBlock transaction in every Arbitrum Block that should not count toward TPS
                transactionCount -= 1;
            }

            return Task.FromResult(new Block()
            {
                BlockNumber = blockNumber,
                GasUsed = double.Parse(gasUsed),
                TransactionCount = transactionCount,
                Date = date
            });
        }

        public async Task<Block> GetBlockInfoAsync(DateTime time)
        {
            var requestModel = _requestModelFactory.CreateGetBlockNumberByTimestampRequest(time);
            var requestString = requestModel.ToQueryString();
            var blockNumberRequest = await _httpClient.GetAsync(requestString);
            string blockNumberString = JsonConvert.DeserializeObject<dynamic>(await blockNumberRequest.Content.ReadAsStringAsync()).result.ToString();
            int blockNumber;
            if (!int.TryParse(blockNumberString, out blockNumber))
            {
                throw new ArgumentException($"Error parsing block number\r\nDetails: \"{blockNumberString}\"");
            }
            return await GetBlockInfoAsync(blockNumber);
        }

        public virtual async Task<Block> GetLatestBlockInfoAsync() => await GetBlockInfoAsync(DateTime.Now.ToUniversalTime());
    }
}
