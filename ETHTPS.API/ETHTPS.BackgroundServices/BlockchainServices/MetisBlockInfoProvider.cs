using ETHTPS.Services.BlockchainServices.Models.JSONRPC;
using ETHTPS.Services.Infrastructure.Serialization;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("Metis")]
    public class MetisBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseURL;
        private readonly string _transactionCountSelector;
        private readonly string _dateSelector;
        private readonly string _gasSelector;

        public MetisBlockInfoProvider(IConfiguration configuration)
        {
            var config = configuration.GetSection("BlockInfoProviders").GetSection("Metis");
            _baseURL = config.GetValue<string>("BaseURL");
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(_baseURL)
            };

            _transactionCountSelector = config.GetValue<string>("TransactionCountSelector");
            _dateSelector = config.GetValue<string>("DateSelector");
            _gasSelector = config.GetValue<string>("GasUsedSelector");
        }

        public double BlockTimeSeconds { get; set; }

        public async Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            HtmlWeb web = new HtmlWeb();
            HtmlDocument doc = web.Load($"{_baseURL}/block/{blockNumber}/transactions");

            var dateNode = doc.DocumentNode.QuerySelectorAll(_dateSelector);
            var date = string.Join(" ", dateNode.Select(x => x.Attributes["data-from-now"].Value)).Replace(".000000Z", string.Empty);
            var dateTime = DateTime.Parse(date);
            ;

            var gasNode = doc.DocumentNode.QuerySelectorAll(_gasSelector);
            var gas = new string(string.Join(" ", gasNode.Select(x => x.InnerText.Substring(0, x.InnerText.IndexOf("|")))).Where(Char.IsNumber).ToArray());

            var txCount = int.Parse(JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync($"{_baseURL}/block/{blockNumber}/transactions?type=JSON")).items.Count.ToString());

            return new BlockInfo()
            {
                BlockNumber = blockNumber,
                Date = dateTime,
                GasUsed = double.Parse(gas),
                Settled = true,
                TransactionCount = txCount
            };
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            var requestModel = JSONRPCRequestFactory.CreateGetBlockHeightRequest();
            var json = requestModel.SerializeAsJsonWithEmptyArray();
            var message = new HttpRequestMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                Method = HttpMethod.Post,
                RequestUri = new Uri("/api/eth-rpc", UriKind.Relative)
            };
            var response = await _httpClient.SendAsync(message);
            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<JSONRPCResponseModel>(responseString);
                return await GetBlockInfoAsync(Convert.ToInt32(responseObject.Result, 16));
            }
            return null;
        }
    }
}
