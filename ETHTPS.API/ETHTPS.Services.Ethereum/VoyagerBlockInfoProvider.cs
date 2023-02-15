using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Data.Core.Models.DataEntries;
using Newtonsoft.Json;

using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ETHTPS.Services.Attributes;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Starknet")]
    [RunsEvery(CronConstants.Every13s)]
    public class VoyagerBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;
        public double BlockTimeSeconds { get; set; }

        public VoyagerBlockInfoProvider()
        {
            _httpClient = new HttpClient();
        }

        public Task<Block> GetBlockInfoAsync(int blockNumber)
        {
            throw new NotImplementedException();
        }

        public Task<Block> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<Block> GetLatestBlockInfoAsync()
        {
            var responseString = await _httpClient.GetStringAsync("https://voyager.online/api/blocks?ps=10&p=1");
            var response = JsonConvert.DeserializeObject<StarknetResponse>(responseString);
            var settledBlocks = response.items.Where(x => x.status == "Accepted on L1").OrderByDescending(x => x.timestamp);
            var first = settledBlocks.ElementAt(0);
            var second = settledBlocks.ElementAt(1);
            BlockTimeSeconds = DateTimeExtensions.FromUnixTime(first.timestamp).Subtract(DateTimeExtensions.FromUnixTime(second.timestamp)).TotalSeconds;
            return new Block()
            {
                Date = DateTimeExtensions.FromUnixTime(first.timestamp),
                TransactionCount = first.txnCount
            };
        }


        public class StarknetResponse
        {
            public StarknetBlockInfo[] items { get; set; }
            public int lastPage { get; set; }
        }

        public class StarknetBlockInfo
        {
            public string id { get; set; }
            public string previousBlockId { get; set; }
            public int sequence { get; set; }
            public string stateRoot { get; set; }
            public int timestamp { get; set; }
            public int txnCount { get; set; }
            public string status { get; set; }
            public string l1VerificationTxHash { get; set; }
        }

    }
}
