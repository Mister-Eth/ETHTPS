using ETHTPS.API.BIL.Infrastructure.Services.BlockInfo;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.Extensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Starkware.API;
using ETHTPS.Data.Core.Models.DataEntries;
using Microsoft.Extensions.Configuration;

using System;
using System.Linq;
using System.Threading.Tasks;
using ETHTPS.Services.Attributes;

namespace ETHTPS.Services.Ethereum.Starkware
{
    [RunsEvery(CronConstants.Every30s)]
    public abstract class StarkwareBlockInfoProviderBase : IBlockInfoProvider
    {
        private readonly string _productName;
        private readonly EthtpsContext _context;
        private readonly StarkwareClient _starkwareClient;

        public StarkwareBlockInfoProviderBase(string productName, EthtpsContext context, IConfiguration configuration)
        {
            _productName = productName;
            _context = context;

            _starkwareClient = new StarkwareClient(configuration);
        }

        public double BlockTimeSeconds { get; set; } = 100;

        public Task<Block> GetBlockInfoAsync(int blockNumber)
        {
            throw new NotImplementedException();
        }

        public async Task<Block> GetBlockInfoAsync(DateTime time)
        {
            var txCountForDay = await _starkwareClient.GetTransactionCountForAllTokensAsync(time, _productName);
            return new Block()
            {
                Date = time,
                Settled = true,
                TransactionCount = (int)(100 * txCountForDay / 86400)
            };
        }

        public async Task<Block> GetLatestBlockInfoAsync()
        {
            var todaysTransactionCount = await _starkwareClient.GetTodayTransactionCountForAllTokensAsync(_productName);
            var mainnetID = _context.GetMainnetID();
            if (!_context.StarkwareTransactionCountData.Any(x => x.Product == _productName)) //First time we see this product
            {
                _context.StarkwareTransactionCountData.Add(new StarkwareTransactionCountDatum()
                {
                    LastUpdateCount = todaysTransactionCount,
                    LastUpdateTime = DateTime.Now,
                    Network = mainnetID,
                    Product = _productName,
                    LastUpdateTps = todaysTransactionCount / DateTime.Now.TimeOfDay.TotalSeconds
                });
                _context.SaveChanges();
            }

            var entry = _context.StarkwareTransactionCountData.First(x => x.Product == _productName);
            if (entry.LastUpdateCount != todaysTransactionCount) //tx count has changed, update the entry
            {
                if (entry.LastUpdateTime.Day == DateTime.Now.Day)
                {
                    entry.LastUpdateTps = (todaysTransactionCount - entry.LastUpdateCount) / DateTime.Now.Subtract(entry.LastUpdateTime).TotalSeconds;  //TPS since last update
                }
                else //New day
                {
                    entry.LastUpdateTps = (double)todaysTransactionCount / 86400;
                }

                entry.LastUpdateCount = todaysTransactionCount;
                entry.LastUpdateTime = DateTime.Now;

                _context.StarkwareTransactionCountData.Update(entry);
                _context.SaveChanges();
            }
            return new Block()
            {
                Settled = true,
                TransactionCount = (int)(100 * entry.LastUpdateTps),
                Date = DateTime.Now
            };
        }
    }
}
