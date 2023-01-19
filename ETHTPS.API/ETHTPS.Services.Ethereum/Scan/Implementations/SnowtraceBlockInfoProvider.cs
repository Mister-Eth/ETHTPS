using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("AVAX C-chain")]
    public class SnowTraceBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public SnowTraceBlockInfoProvider(IConfiguration configuration) : base(configuration, "Snowtrace")
        {
        }
    }
}
