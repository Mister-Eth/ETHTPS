using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC
{
    [Provider("Starknet")]
    public class StarknetBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public StarknetBlockInfoProvider(IConfiguration configuration) :base(configuration, "StarknetEndpoint")
        {

        }
    }
}
