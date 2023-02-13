using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Generic
{
    [Provider("Ethereum")]
    [RunsEvery(CronConstants.Every5s)]
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
