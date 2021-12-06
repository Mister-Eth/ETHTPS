using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("OMG Network")]
    public class OMGNetworkBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;

        public OMGNetworkBlockInfoProvider()
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
            var response = await _httpClient.PostAsync("https://watcher-info.mainnet.v1.omg.network/block.all", null);
            var responseObject = JsonConvert.DeserializeObject<OMGResponseObject>(await response.Content.ReadAsStringAsync());
            var latestBlock = responseObject.data[0];
            var secondToLatestBlock = responseObject.data[1];
            BlockTimeSeconds = latestBlock.inserted_at.Subtract(secondToLatestBlock.inserted_at).TotalSeconds;
            return new BlockInfo()
            {
                BlockNumber = latestBlock.blknum,
                Date = latestBlock.inserted_at,
                TransactionCount = latestBlock.tx_count
            };
        }


        public class OMGResponseObject
        {
            public BlockData[] data { get; set; }
            public Data_Paging data_paging { get; set; }
            public string service_name { get; set; }
            public bool success { get; set; }
            public string version { get; set; }
        }

        public class Data_Paging
        {
            public int limit { get; set; }
            public int page { get; set; }
        }

        public class BlockData
        {
            public int blknum { get; set; }
            public int eth_height { get; set; }
            public string hash { get; set; }
            public DateTime inserted_at { get; set; }
            public int timestamp { get; set; }
            public int tx_count { get; set; }
            public DateTime updated_at { get; set; }
        }

    }
}
