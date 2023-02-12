using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("AVAX C-chain")]
    public class AVAXBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public AVAXBlockInfoProvider(IConfiguration configuration) : base(configuration, "AVAXEndpoint")
        {

        }
    }
}
