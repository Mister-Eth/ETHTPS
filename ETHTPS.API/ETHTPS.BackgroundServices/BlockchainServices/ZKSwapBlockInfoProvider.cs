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
    [Provider("ZKSwap")]
    public class ZKSwapBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        public ZKSwapBlockInfoProvider()
        {
            _httpClient = new HttpClient();
        }

        public double BlockTimeSeconds { get; set; }

        public async Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync($"https://api.zkswap.info/v2/block/{blockNumber}"));
            var block = obj.data;
            return new BlockInfo()
            {
                Date = DateTimeExtensions.FromUnixTime(long.Parse(block.committed_at.ToString())),
                BlockNumber = int.Parse(block.number.ToString()),
                TransactionCount = int.Parse(block.transactions_number.ToString())
            };
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            var blocks = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://api.zkswap.info/v2/blocks?start=0&limit=2"));
            return await GetBlockInfoAsync(int.Parse(blocks.data.data[0].number.ToString()));
        }
    }
}
