
using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.BlockchainServices
{
    [Provider("Habitat")]
    public class HabitatBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public HabitatBlockInfoProvider(IConfiguration configuration) : base(configuration, "Habitat")
        {
        }
    }
}
