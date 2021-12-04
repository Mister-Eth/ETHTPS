using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan.Implementations
{
    [Provider("Binance Smart Chain")]
    public class BSCScanBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public BSCScanBlockInfoProvider(IConfiguration configuration) : base(configuration, "BSCScan")
        {
        }
    }
}
