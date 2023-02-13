using ETHTPS.Services.Attributes;
using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

using System;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Ethereum")]
    [Disabled]
    [Obsolete("Use JSONRPC.EthereumBlockInfoProvider instead", true)]
    public class EtherscanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public EtherscanBlockInfoProvider(IConfiguration configuration) : base(configuration, "Etherscan")
        {

        }
    }
}
