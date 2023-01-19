using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Scan.Implementations
{
    [Provider("Binance Smart Chain")]
    public class BSCScanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public BSCScanBlockInfoProvider(IConfiguration configuration) : base(configuration, "BSCScan")
        {
        }
    }
}
