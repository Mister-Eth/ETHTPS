using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Scan.Implementations
{
    [Provider("AVAX C-Chain")]
    public class SnowTraceBlockInfoProvider : ScanBlockInfoProviderBase
    {
        public SnowTraceBlockInfoProvider(IConfiguration configuration) : base(configuration, "Snowtrace")
        {
        }
    }
}
