using ETHTPS.Data.Extensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Attributes;

using Hangfire;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.OtherBlockchains
{
    [Provider("Bitcoin")]
    [Queue(Constants.Queues.TPSUPDATERQUEUE)]
    [RunEvery(Constants.CronConstants.Every5Minutes)]
    public class BitcoinBlockInfoProvider : IBlockInfoProvider
    {
        private readonly HttpClient _httpClient = new HttpClient();

        public double BlockTimeSeconds { get; set; } = 600;

        public async Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            var response = JsonConvert.DeserializeObject<BlockResponse>(await _httpClient.GetStringAsync($"https://blockchain.info/rawblock/{blockNumber}"));
            return new BlockInfo()
            {
                BlockNumber = response.block_index,
                Date = DateTimeExtensions.FromUnixTime(response.time),
                TransactionCount = response.tx.Length
            };
        }

        public Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            var response = JsonConvert.DeserializeObject<LatestBlockResponse>(await _httpClient.GetStringAsync($"https://blockchain.info/latestblock"));
            return await GetBlockInfoAsync(response.height);
        }

        public class BlockResponse
        {
            public string hash { get; set; }
            public int ver { get; set; }
            public string prev_block { get; set; }
            public string mrkl_root { get; set; }
            public int time { get; set; }
            public int bits { get; set; }
            public string[] next_block { get; set; }
            public int fee { get; set; }
            public long nonce { get; set; }
            public int n_tx { get; set; }
            public int size { get; set; }
            public int block_index { get; set; }
            public bool main_chain { get; set; }
            public int height { get; set; }
            public int weight { get; set; }
            public Tx[] tx { get; set; }
        }

        public class Tx
        {
            public string hash { get; set; }
            public int ver { get; set; }
            public int vin_sz { get; set; }
            public int vout_sz { get; set; }
            public int size { get; set; }
            public int weight { get; set; }
            public int fee { get; set; }
            public string relayed_by { get; set; }
            public int lock_time { get; set; }
            public long tx_index { get; set; }
            public bool double_spend { get; set; }
            public int time { get; set; }
            public int block_index { get; set; }
            public int block_height { get; set; }
            public Input[] inputs { get; set; }
            public Out[] _out { get; set; }
        }

        public class Input
        {
            public long sequence { get; set; }
            public string witness { get; set; }
            public string script { get; set; }
            public int index { get; set; }
            public Prev_Out prev_out { get; set; }
        }

        public class Prev_Out
        {
            public long tx_index { get; set; }
            public long value { get; set; }
            public long n { get; set; }
            public int type { get; set; }
            public bool spent { get; set; }
            public string script { get; set; }
            public Spending_Outpoints[] spending_outpoints { get; set; }
            public string addr { get; set; }
        }

        public class Spending_Outpoints
        {
            public long tx_index { get; set; }
            public int n { get; set; }
        }

        public class Out
        {
            public int type { get; set; }
            public bool spent { get; set; }
            public long value { get; set; }
            public Spending_Outpoints1[] spending_outpoints { get; set; }
            public int n { get; set; }
            public long tx_index { get; set; }
            public string script { get; set; }
            public string addr { get; set; }
        }

        public class Spending_Outpoints1
        {
            public long tx_index { get; set; }
            public int n { get; set; }
        }


        public class LatestBlockResponse
        {
            public int height { get; set; }
            public int time { get; set; }
            public int block_index { get; set; }
            public long[] txIndexes { get; set; }
            public string hash { get; set; }
        }

    }
}
