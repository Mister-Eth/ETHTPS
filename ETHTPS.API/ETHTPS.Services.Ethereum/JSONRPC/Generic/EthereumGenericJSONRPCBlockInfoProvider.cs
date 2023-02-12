using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Generic
{
    [Provider("Ethereum")]
    public class EthereumGenericJSONRPCBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public EthereumGenericJSONRPCBlockInfoProvider(string endpoint) : base(endpoint)
        {

        }
        public EthereumGenericJSONRPCBlockInfoProvider(IConfiguration configuration) : base(configuration, "GenericJSONRPC", "Ethereum0")
        {
        }
    }
}
