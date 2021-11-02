using ETHTPS.BackgroundServices.TPSDataUpdaters;
using ETHTPS.Data.Database;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters.Standard
{
    public class ZKSyncUpdater : TPSDataUpdaterBase
    {
        private readonly HttpClient _httpClient;
        public ZKSyncUpdater(ETHTPSContext context, ILogger<HangfireBackgroundService> logger) : base("ZKSync", logger, context)
        {
            _httpClient = new HttpClient();
        }

        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        private static DateTime FromUnixTime(long unixTime)
        {
            return epoch.AddSeconds(unixTime);
        }

        public override async Task<TPSData> GetDataAsync()
        {
            var data = default(TPSData);
            try
            {
                var blocks = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync("https://api.zksync.io/api/v0.1/blocks?limit=20"));
                for (int i = 0; i < blocks.Count - 1; i++)
                {
                    var block = blocks[i];
                    if (block.verified_at != null)
                    {
                        var nextBlockBatchIndex = GetNextBlockBatchIndex(blocks, i);
                        var previousBlockBatchFirstEntry = blocks[nextBlockBatchIndex];
                        string blockNumber = block.block_number.ToString();
                        var providerID = _context.Providers.First(x => x.Name == Name).Id;
                        if (!_context.TPSData.Any(x => x.Block == blockNumber && x.Provider == providerID))
                        {
                            DateTime currentBlockTime = DateTime.Parse(block.committed_at.ToString());
                            DateTime previousBlockTime = DateTime.Parse(previousBlockBatchFirstEntry.committed_at.ToString());
                            data = new TPSData()
                            {
                                Date = currentBlockTime,
                                Provider = providerID,
                                Tps = 0, //(double) (await GetNumberOfTransactionsAsync(block.block_number.ToString())) / (double) currentBlockTime.Subtract(previousBlockTime).TotalSeconds
                                Block = blockNumber
                            };
                            for (int j = i; j < nextBlockBatchIndex; j++)
                            {
                                data.Tps += await GetNumberOfTransactionsAsync(blocks[j].block_number.ToString());
                            }
                            data.Tps /= currentBlockTime.Subtract(previousBlockTime).TotalSeconds;
                            break;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
            return data;
        }

        private int GetNextBlockBatchIndex(dynamic blocks, int currentIndex)
        {
            for (int i = currentIndex + 1; i < blocks.Count; i++)
            {
                if (DateTime.Parse(blocks[i].committed_at.ToString()) != DateTime.Parse(blocks[currentIndex].committed_at.ToString()))
                {
                    return i;
                }
            }
            return -1;
        }

        private async Task<int> GetNumberOfTransactionsAsync(string blockNumber)
        {
            var txs = JsonConvert.DeserializeObject<dynamic>(await _httpClient.GetStringAsync($"https://api.zksync.io/api/v0.1/blocks/{blockNumber}/transactions"));
            var count = txs.Count;
            return count;
        }
    }
    
}
