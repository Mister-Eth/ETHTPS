using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Data.Core.Models.DataEntries;
using Newtonsoft.Json;

using System;
using System.Net.Http;
using System.Threading.Tasks;
using ETHTPS.Services.Attributes;

namespace ETHTPS.Services.Ethereum
{
    [Provider("zkTube")]
    [RunsEvery(CronConstants.Every30s)]
    public class ZKTubeBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient;

        public ZKTubeBlockInfoProvider()
        {
            _httpClient = new HttpClient();
        }

        public double BlockTimeSeconds { get; set; }

        public async Task<Block> GetBlockInfoAsync(int blockNumber)
        {
            var responseString = await _httpClient.GetStringAsync($"https://api.zktube.io/api/v0.1/blocks/{blockNumber}/transactions");
            var transactionsResponse = JsonConvert.DeserializeObject<dynamic>(responseString);

            responseString = await _httpClient.GetStringAsync($"https://api.zktube.io/api/v0.1/blocks/{blockNumber}");
            var blockSummary = JsonConvert.DeserializeObject<BlockSummary>(responseString);
            var txCount = 0;
            try
            {
                txCount = (int)transactionsResponse.Count;
            }
            catch
            {
                ;
            }
            return new Block()
            {
                TransactionCount = txCount,
                Date = blockSummary.committed_at,
                BlockNumber = blockNumber
            };
        }

        public Task<Block> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<Block> GetLatestBlockInfoAsync()
        {
            var responseString = await _httpClient.GetStringAsync("https://api.zktube.io/api/v0.1/status");
            var response = JsonConvert.DeserializeObject<StatusResponse>(responseString);
            return await GetBlockInfoAsync(response.last_verified);
        }


        public class BlockSummary
        {
            public int block_number { get; set; }
            public string new_state_root { get; set; }
            public int block_size { get; set; }
            public string commit_tx_hash { get; set; }
            public object verify_tx_hash { get; set; }
            public DateTime committed_at { get; set; }
            public object verified_at { get; set; }
        }


        public class TransactionsResponse
        {
            public Transaction[] Property1 { get; set; }
        }

        public class Transaction
        {
            public string tx_hash { get; set; }
            public int block_number { get; set; }
            public Op op { get; set; }
            public bool success { get; set; }
            public object fail_reason { get; set; }
            public DateTime created_at { get; set; }
        }

        public class Op
        {
            public string to { get; set; }
            public string fee { get; set; }
            public bool fast { get; set; }
            public string from { get; set; }
            public string type { get; set; }
            public int nonce { get; set; }
            public int token { get; set; }
            public string amount { get; set; }
            public int accountId { get; set; }
            public Signature signature { get; set; }
        }

        public class Signature
        {
            public string pubKey { get; set; }
            public string signature { get; set; }
        }


        public class StatusResponse
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
