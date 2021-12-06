using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("zkTube")]
    public class ZKTubeBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;

        public ZKTubeBlockInfoProvider()
        {
            _httpClient = new HttpClient();
        }

        public double BlockTimeSeconds { get; set; }

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
            var responseString = await _httpClient.GetStringAsync("https://api.zktube.io/api/v0.1/status");
            var response = JsonConvert.DeserializeObject<StatusResponseObject>(responseString);
            return await GetLatestBlockInfoAsync(response.last_verified);
        }


        public class StatusResponseObject
        {
            public object next_block_at_max { get; set; }
            public int last_committed { get; set; }
            public int last_verified { get; set; }
            public int total_transactions { get; set; }
            public int outstanding_txs { get; set; }
            public int access_node { get; set; }
            public int total_task { get; set; }
            public int completed_task { get; set; }
        }

    }
}
