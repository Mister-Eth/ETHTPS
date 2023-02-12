using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("NEAR")]
    public class NEARBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public NEARBlockInfoProvider(IConfiguration configuration) : base(configuration, "NEAREndpoint")
        {

        }
    }
}
