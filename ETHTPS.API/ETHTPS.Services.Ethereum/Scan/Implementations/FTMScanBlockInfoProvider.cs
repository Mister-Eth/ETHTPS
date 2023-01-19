using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Fantom")]
    public class FTMScanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public FTMScanBlockInfoProvider(IConfiguration configuration) : base(configuration, "FTMScan")
        {
        }
    }
}
