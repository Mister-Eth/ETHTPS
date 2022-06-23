using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Attributes;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
