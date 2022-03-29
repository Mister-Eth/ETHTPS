using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Services.BlockchainServices.Starkware.API;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Starkware
{
    public abstract class StarkwareBlockInfoProviderBase : IBlockInfoProvider
    {
        private readonly string _productName;
        private readonly ETHTPSContext _context;
        private readonly StarkwareClient _starkwareClient;

        public StarkwareBlockInfoProviderBase(string productName, ETHTPSContext context, IConfiguration configuration)
        {
            _productName = productName;
            _context = context;

            _starkwareClient = new StarkwareClient(configuration);
        }

        public double BlockTimeSeconds { get; set; } = 100;

        public Task<BlockInfo> GetBlockInfoAsync(int blockNumber)
        {
            throw new NotImplementedException();
        }

        public async Task<BlockInfo> GetBlockInfoAsync(DateTime time)
        {
            var txCountForDay = await _starkwareClient.GetTransactionCountForAllTokensAsync(time, _productName);
            return new BlockInfo()
            {
                Date = time,
                Settled = true,
                TransactionCount = (int)(100 * txCountForDay / 86400)
            };
        }

        public async Task<BlockInfo> GetLatestBlockInfoAsync()
        {
            var yesterdaysTransactionCount = await _starkwareClient.GetYesterdaysTransactionCountForAllTokensAsync(_productName);
            var mainnetID = _context.GetMainnetID();
            if (!_context.StarkwareTransactionCountData.Any(x => x.Product == _productName)) //First time we see this product
            {
                _context.StarkwareTransactionCountData.Add(new StarkwareTransactionCountData()
                {
                    LastUpdateCount = yesterdaysTransactionCount,
                    LastUpdateTime = DateTime.Now.Subtract(TimeSpan.FromDays(1)),
                    Network = mainnetID,
                    Product = _productName,
                    LastUpdateTPS = yesterdaysTransactionCount / DateTime.Now.TimeOfDay.TotalSeconds
                });
                _context.SaveChanges();
            }

            var entry = _context.StarkwareTransactionCountData.First(x => x.Product == _productName);
            if (entry.LastUpdateCount != yesterdaysTransactionCount) //tx count has changed, update the entry
            {
                if (entry.LastUpdateTime.Day == (DateTime.Now.Day - 1))
                {
                    entry.LastUpdateTPS = (yesterdaysTransactionCount - entry.LastUpdateCount) / DateTime.Now.Subtract(entry.LastUpdateTime).TotalSeconds;  //TPS since last update
                }
                else //New day
                {
                    entry.LastUpdateTPS = yesterdaysTransactionCount / 86400;
                }

                entry.LastUpdateCount = yesterdaysTransactionCount;
                entry.LastUpdateTime = DateTime.Now.Subtract(TimeSpan.FromDays(1));

                _context.StarkwareTransactionCountData.Update(entry);
                _context.SaveChanges();
            }
            return new BlockInfo()
            {
                Settled = true,
                TransactionCount = (int)(100 * entry.LastUpdateTPS),
                Date = DateTime.Now
            };
        }
    }
}
