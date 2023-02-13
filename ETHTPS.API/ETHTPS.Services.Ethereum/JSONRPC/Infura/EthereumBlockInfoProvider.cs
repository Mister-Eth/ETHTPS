using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("Ethereum")]
    [RunsEvery(CronConstants.Every5s)]
    public class EthereumBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public EthereumBlockInfoProvider(IConfiguration configuration, EthereumBlockTimeProvider ethereumBlockTimeProvider) : base(configuration, "EthereumEndpoint")
        {
            BlockTimeSeconds = ethereumBlockTimeProvider.GetBlockTime();
        }
    }
}
