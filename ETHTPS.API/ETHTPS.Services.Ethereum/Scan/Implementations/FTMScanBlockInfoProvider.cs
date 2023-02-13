using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Fantom")]
    [RunsEvery(CronConstants.Every10s)]
    public class FTMScanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public FTMScanBlockInfoProvider(IConfiguration configuration) : base(configuration, "FTMScan")
        {
        }
    }
}
