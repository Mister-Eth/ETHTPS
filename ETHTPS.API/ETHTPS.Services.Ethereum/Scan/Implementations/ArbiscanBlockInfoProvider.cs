using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Polygon")]
    public class PolygonScanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public PolygonScanBlockInfoProvider(IConfiguration configuration) : base(configuration, "Polygonscan")
        {
        }
    }
}
