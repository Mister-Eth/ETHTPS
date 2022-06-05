﻿using ETHTPS.Services.BlockchainServices;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
