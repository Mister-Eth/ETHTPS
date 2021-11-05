using ETHTPS.Data.Extensions;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("Loopring")]
    public class LoopringBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;

        public double BlockTimeSeconds { get; set; }

        public LoopringBlockInfoProvider()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.thegraph.com/subgraphs/name/loopring/loopring");
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

        public async Task<BlockInfo> GetLatestBlockInfoAsync() => await GetBlockInfoAsync(await GetLatestBlockHeightAsync());

        public async Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            var payload = new GraphQLPayload()
            {
                query = "{blocks(where:{id: " + blockNumber + "}) {    id    timestamp    txHash   gasLimit   transactionCount {      id    }  }}"
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
                    Date = DateTimeExtensions.FromUnixTime(int.Parse(obj.data.blocks[0].timestamp)),
                    BlockNumber = blockNumber,
                    GasUsed = double.Parse(obj.data.blocks[0].gasLimit)
                };
            }
            return null;
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
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
            public string gasLimit { get; set; }
        }


    }
}
