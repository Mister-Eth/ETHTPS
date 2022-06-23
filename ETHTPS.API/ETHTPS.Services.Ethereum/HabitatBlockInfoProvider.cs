
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Attributes;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Habitat")]
    public class HabitatBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public HabitatBlockInfoProvider(IConfiguration configuration) : base(configuration, "Habitat")
        {
        }
    }
}
