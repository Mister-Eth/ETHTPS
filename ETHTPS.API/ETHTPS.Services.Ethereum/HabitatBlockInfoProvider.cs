
using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.JSONRPC;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Habitat")]
    [Disabled]
    public class HabitatBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public HabitatBlockInfoProvider(IConfiguration configuration) : base(configuration, "Habitat")
        {
        }
    }
}
