using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

using System;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Polygon")]
    [Obsolete("Use JSONRPC.PolygonBlockInfoProvider instead", true)]
    public class PolygonScanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public PolygonScanBlockInfoProvider(IConfiguration configuration) : base(configuration, "Polygonscan")
        {
        }
    }
}
