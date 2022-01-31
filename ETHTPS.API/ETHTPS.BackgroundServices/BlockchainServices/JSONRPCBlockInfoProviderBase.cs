using ETHTPS.Data.Extensions;
using ETHTPS.Services.BlockchainServices.Models.JSONRPC;
using ETHTPS.Services.Infrastructure.Serialization;

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
    public abstract class JSONRPCBlockInfoProviderBase : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;

        public JSONRPCBlockInfoProviderBase(IConfiguration configuration, string sectionName)
        {
            var config = configuration.GetSection(sectionName);
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(config.GetValue<string>("Endpoint"))
            };
        }

        public double BlockTimeSeconds { get; set; }

        public async Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            var requestModel = JSONRPCRequestFactory.CreateGetBlockByBlockNumberRequest("0x" + blockNumber.ToString("X"));
            var json = requestModel.SerializeAsJsonWithEmptyArray();
            var message = new HttpRequestMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                Method = HttpMethod.Post
            };
            var response = await _httpClient.SendAsync(message);
            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<JSONRPCGetBlockByNumberResponseModel>(responseString);
                var result = new BlockInfo()
                {
                    BlockNumber = blockNumber,
                    Date = DateTimeExtensions.FromUnixTime(Convert.ToInt64(responseObject.result.timestamp, 16)),
                    TransactionCount = responseObject.result.transactions.Length,
                    Settled = true,
                    GasUsed = Convert.ToInt64(responseObject.result.gasUsed, 16)
                };
                return result;
            }
            return null;
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
                Method = HttpMethod.Post
            };
            var response = await _httpClient.SendAsync(message);
            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<JSONRPCResponseModel>(responseString);
                var blockNumber = Convert.ToInt32(responseObject.Result, 16);
                return await GetBlockInfoAsync(blockNumber);
            }
            return null;
        }
    }
}
