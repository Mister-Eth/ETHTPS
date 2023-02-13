using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

using System;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("AVAX C-chain")]
    [Disabled]
    [Obsolete("Use JSONRPC.AVAXBlockInfoProvider instead", true)]
    public class SnowTraceBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public SnowTraceBlockInfoProvider(IConfiguration configuration) : base(configuration, "Snowtrace")
        {
        }
    }
}
