using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC
{
    public abstract class InfuraBlockInfoProviderBase : JSONRPCBlockInfoProviderBase
    {
        public InfuraBlockInfoProviderBase(IConfiguration configuration, string endpointFieldName) : base(configuration, "Infura", endpointFieldName)
        {
        }
    }
}
