using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    [Provider("Aurora")]
    public class AuroraBlockInfoProvider : InfuraBlockInfoProviderBase
    {
        public AuroraBlockInfoProvider(IConfiguration configuration) : base(configuration, "AuroraEndpoint")
        {

        }
    }
}
