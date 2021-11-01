using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions;

using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters.Standard
{
    public class LoopringUpdater : TPSDataUpdaterBase
    {
        private readonly HttpClient _httpClient;
        public LoopringUpdater(ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base("Loopring", logger, context)
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.thegraph.com/subgraphs/name/loopring/loopring");
        }

        public override async Task<TPSData> LogDataAsync()
        {
            var data = default(TPSData);
            var latestBlockHeight = await GetLatestBlockHeightAsync();
            var latestBlock = await GetBlockInfo(latestBlockHeight);
            var secondToLatestBlock = await GetBlockInfo(latestBlockHeight - 1);
            var providerID = await _context.GetProviderIDAsync(Name);
            if (!_context.TPSData.Any(x => x.Provider == providerID && x.Block == latestBlockHeight.ToString())) 
            {
                data = new TPSData()
                {
                    Block = latestBlockHeight.ToString(),
                    Date = latestBlock.Time,
                    Provider = providerID,
                    Tps = (float)latestBlock.TransactionCount / (float)latestBlock.Time.Subtract(secondToLatestBlock.Time).TotalSeconds
                };
                _context.TPSData.Add(data);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"{Name}: {data.Tps}TPS");
            }
            var secondToLastBlock = await GetBlockInfo(latestBlockHeight - 1);

            return data;
        }

        private async Task<BlockInfo> GetBlockInfo(int blockNumber)
        {
            var payload = new GraphQLPayload()
            {
                query = "{blocks(where:{id: " + blockNumber + "}) {    id    timestamp    txHash    transactionCount {      id    }  }}"
            };
            var message = new HttpRequestMessage()
            {
                Content = JsonContent.Create(payload),
                Method = HttpMethod.Post
            };
            //message.Headers.Add("Content-Type", "application/json");
            var response = await _httpClient.SendAsync(message);
            if (response.IsSuccessStatusCode)
            {
                var obj = JsonConvert.DeserializeObject<BlocksRootobject>(await response.Content.ReadAsStringAsync());
                return new BlockInfo()
                {
                    TransactionCount = int.Parse(obj.data.blocks[0].transactionCount),
                    Time = DateTimeExtensions.FromUnixTime(int.Parse(obj.data.blocks[0].timestamp))
                };
            }
            return null;
        }

        private async Task<int> GetLatestBlockHeightAsync()
        {
            var payload = new GraphQLPayload()
            {
                query = "{proxies(first:5){id tokenCount blockCount transferCount accountUpdateCount}}"
            };
            var message = new HttpRequestMessage()
            {
                Content = JsonContent.Create(payload),
                Method = HttpMethod.Post
            };
            //message.Headers.Add("Content-Type", "application/json");
            var response = await _httpClient.SendAsync(message);
            if (response.IsSuccessStatusCode)
            {
                var obj = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                return int.Parse(obj.data.proxies[0].blockCount.ToString());
            }
            return 0;
        }

        private class GraphQLPayload
        {
            public string query { get; set; }
            public object variables { get; set; } = null;
        }


        public class BlocksRootobject
        {
            public Data data { get; set; }
        }

        public class Data
        {
            public Block[] blocks { get; set; }
        }

        public class Block
        {
            public int blockSize { get; set; }
            public string id { get; set; }
            public string timestamp { get; set; }
            public string transactionCount { get; set; }
            public string txHash { get; set; }
        }


    }
}
