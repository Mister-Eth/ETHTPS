using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Arbitrum One")]
    public class ArbiscanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public ArbiscanBlockInfoProvider(IConfiguration configuration) : base(configuration, "Arbiscan")
        {
        }
    }
}
