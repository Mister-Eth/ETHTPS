using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Data.Core.Models.DataEntries;
using Newtonsoft.Json;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using ETHTPS.Services.Attributes;

namespace ETHTPS.Services.Ethereum
{
    [Provider("ZKSpace")]
    [RunsEvery(CronConstants.Every5s)]
    public class ZKSpaceBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        public ZKSpaceBlockInfoProvider()
        {
            _httpClient = new HttpClient();
        }

        public double BlockTimeSeconds { get; set; }

        public async Task<Block> GetBlockInfoAsync(int blockNumber)
        {
            var obj = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync($"https://api.zkswap.info/v3/block/{blockNumber}"));
            var block = obj.data;
            return new Block()
            {
                Date = DateTimeExtensions.FromUnixTime(long.Parse(block.committed_at.ToString())),
                BlockNumber = int.Parse(block.number.ToString()),
                TransactionCount = int.Parse(block.transactions_number.ToString())
            };
        }

        public Task<Block> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<Block> GetLatestBlockInfoAsync()
        {
            var blocks = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://api.zkswap.info/v3/blocks?start=0&limit=2"));
            return await GetBlockInfoAsync(int.Parse(blocks.data.data[0].number.ToString()));
        }
    }
}
