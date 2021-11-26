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
    [Provider("Ethereum")]
    public class InfuraBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;

        public InfuraBlockInfoProvider(IConfiguration configuration)
        {
            var config = configuration.GetSection("Infura");
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(config.GetValue<string>("Endpoint"))
            };
        }

        public double BlockTimeSeconds { get; set; } = 13.7;

        public Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            throw new NotImplementedException();
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
                requestModel = JSONRPCRequestFactory.CreateGetTransactionCountByBlockNumberRequest(responseObject.Result);
                json = requestModel.SerializeAsJsonWithEmptyArray();
                message = new HttpRequestMessage()
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json"),
                    Method = HttpMethod.Post
                };
                response = await _httpClient.SendAsync(message);
                responseString = await response.Content.ReadAsStringAsync();
                responseObject = JsonConvert.DeserializeObject<JSONRPCResponseModel>(responseString);
                return new BlockInfo()
                {
                    Date = DateTime.Now,
                    TransactionCount = Convert.ToInt32(responseObject.Result, 16),
                    Settled = true,
                    BlockNumber = blockNumber
                };
            }
            return null;
        }
    }
}
