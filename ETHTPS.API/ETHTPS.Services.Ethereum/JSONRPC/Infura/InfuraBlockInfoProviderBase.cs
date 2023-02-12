using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.JSONRPC.Infura
{
    public abstract class InfuraBlockInfoProviderBase : JSONRPCBlockInfoProviderBase
    {
        public InfuraBlockInfoProviderBase(IConfiguration configuration, string endpointFieldName) : base(configuration, "Infura", endpointFieldName)
        {
        }
    }
}
