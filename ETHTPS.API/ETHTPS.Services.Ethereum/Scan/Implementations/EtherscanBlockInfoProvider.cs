using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Ethereum")]
    public class EtherscanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public EtherscanBlockInfoProvider(IConfiguration configuration) : base(configuration, "Etherscan")
        {

        }
    }
}
