using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Ethereum")]
    public class InfuraBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public InfuraBlockInfoProvider(IConfiguration configuration, EthereumBlockTimeProvider ethereumBlockTimeProvider) : base(configuration, "Infura")
        {
            BlockTimeSeconds = ethereumBlockTimeProvider.GetBlockTime();
        }
    }
}
