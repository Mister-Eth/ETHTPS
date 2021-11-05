using ETHTPS.Data.Extensions;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("ZKSync")]
    public class ZKSsyncBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        public ZKSsyncBlockInfoProvider()
        {
            _httpClient = new HttpClient();
        }

        public double BlockTimeSeconds { get; set; }

        public async Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync($"https://api.zksync.io/api/v0.1/blocks/{blockNumber}"));
            var txs = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync($"https://api.zksync.io/api/v0.1/blocks/{blockNumber}/transactions"));
            var block = obj;
            return new BlockInfo()
            {
                Date = DateTime.Parse(block.committed_at.ToString()),
                BlockNumber = int.Parse(block.block_number.ToString()),
                TransactionCount = txs.Count
            };
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            var blocks = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://api.zksync.io/api/v0.1/blocks?limit=2"));
            return await GetBlockInfoAsync(int.Parse(blocks[0].block_number.ToString()));
        }
    }
}
