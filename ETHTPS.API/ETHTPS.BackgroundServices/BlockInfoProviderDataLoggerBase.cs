using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Extensions;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services
{
    public abstract class BlockInfoProviderDataLoggerBase<T> : HangfireBackgroundService
        where T : IBlockInfoProvider
    {
        protected readonly T _instance;
        protected readonly string _provider;
        protected readonly int _providerID;
        protected readonly int _mainnetID;

        protected BlockInfoProviderDataLoggerBase(T instance, ILogger<HangfireBackgroundService> logger, EthtpsContext context) : base(logger, context)
        {
            _instance = instance;
            _provider = _instance.GetProviderName();
            _providerID = _context.Providers.First(x => x.Name == _provider).Id;

            _mainnetID = context.Networks.First(x => x.Name == "Mainnet").Id;
        }

        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync() => await CalculateTPSGPSAsync(await _instance.GetLatestBlockInfoAsync());
        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync(int blockNumber) => await CalculateTPSGPSAsync(await _instance.GetBlockInfoAsync(blockNumber));
        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync(DateTime atTime) => await CalculateTPSGPSAsync(await _instance.GetBlockInfoAsync(atTime));
        protected async Task<TPSGPSInfo> CalculateTPSGPSAsync(BlockInfo latestBlock)
        {
            if (_instance.BlockTimeSeconds > 0)
            {
                return new TPSGPSInfo()
                {
                    BlockNumber = latestBlock.BlockNumber,
                    Date = latestBlock.Date,
                    GPS = latestBlock.GasUsed / _instance.BlockTimeSeconds,
                    TPS = latestBlock.TransactionCount / _instance.BlockTimeSeconds
                };
            }
            else //Add up all blocks submitted at the same time
            {
                TPSGPSInfo result = new()
                {
                    Date = latestBlock.Date
                };
                BlockInfo secondToLatestBlock;
                int count = 0;
                do
                {
                    result.TPS += latestBlock.TransactionCount;
                    result.GPS += latestBlock.GasUsed;

                    secondToLatestBlock = await _instance.GetBlockInfoAsync(latestBlock.BlockNumber - 1);
                    if (secondToLatestBlock.Date.Subtract(latestBlock.Date).TotalSeconds != 0)
                    {
                        result.TPS /= Math.Abs(secondToLatestBlock.Date.Subtract(result.Date).TotalSeconds);
                        result.GPS /= Math.Abs(secondToLatestBlock.Date.Subtract(result.Date).TotalSeconds);
                        break;
                    }
                    latestBlock = secondToLatestBlock;
                    await Task.Delay(200);
                    if (++count == 100)
                    {
                        throw new Exception($"Possible infinite loop {typeof(T)}");
                    }
                }
                while (true);
                return result;
            }
        }
    }
}
