using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

using System;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Arbitrum One")]
    [Obsolete("Use JSONRPC.PolygonBlockInfoProvider instead", true)]
    [Disabled]
    public class ArbiscanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public ArbiscanBlockInfoProvider(IConfiguration configuration) : base(configuration, "Arbiscan")
        {
        }
    }
}
