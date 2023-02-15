using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.DataEntries;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.JSONRPC.Models;
using ETHTPS.Services.Ethereum.JSONRPC.Models.Exceptions;
using ETHTPS.Services.Infrastructure.Serialization;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum.JSONRPC
{
    public abstract class JSONRPCBlockInfoProviderBase : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        private static DateTime LastCallTime = DateTime.Now;
        private static TimeSpan TIME_BETWEEN = TimeSpan.FromMilliseconds(500);
        private static bool CanCall => TimeSinceLastCall > TIME_BETWEEN;
        private static bool Busy { get; set; }
        private static TimeSpan TimeSinceLastCall => DateTime.Now - LastCallTime;
        public JSONRPCBlockInfoProviderBase(string endpoint)
        {
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(endpoint)
            };
        }
        public JSONRPCBlockInfoProviderBase(IConfiguration configuration, string sectionName, string endpointFieldName = "Endpoint")
        {
            var config = configuration.GetSection(sectionName);
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(config.GetValue<string>(endpointFieldName))
            };
            var authenticationString = $"{config.GetValue<string>("APIKeyID")}:{config.GetValue<string>("Secret")}";
            var base64EncodedAuthenticationString = Convert.ToBase64String(Encoding.UTF8.GetBytes(authenticationString));
            _httpClient.DefaultRequestHeaders.Add("Authorization", "Basic " + base64EncodedAuthenticationString);
        }

        public double BlockTimeSeconds { get; set; }

        public virtual async Task<Block> GetBlockInfoAsync(int blockNumber)
        {
            try
            {
                while (Busy && !CanCall) await Task.Delay(TIME_BETWEEN);
                Busy = true;
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
                    if (responseObject == null || responseObject.result == null)
                        return null;
                    Block result = new()
                    {
                        BlockNumber = blockNumber,
                        Date = DateTimeExtensions.FromUnixTime(Convert.ToInt64(responseObject.result.timestamp, 16)),
                        TransactionCount = responseObject.result.transactions.Length,
                        Settled = true,
                        GasUsed = Convert.ToInt64(responseObject.result.gasUsed, 16)
                    };
                    return result;
                }
            }
            finally
            {
                Busy = false;
                LastCallTime = DateTime.Now;
            }
            throw new JSONRPCRequestException(_httpClient.BaseAddress.ToString());
        }

        public Task<Block> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<Block> GetLatestBlockInfoAsync()
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
            throw new JSONRPCRequestException(_httpClient.BaseAddress.ToString());
        }
    }
}
