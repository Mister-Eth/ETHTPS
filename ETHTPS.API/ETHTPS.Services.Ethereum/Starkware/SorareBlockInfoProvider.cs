using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Starkware.API.Models;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum.Starkware
{
    [Provider("Sorare")]
    public class SorareBlockInfoProvider : StarkwareBlockInfoProviderBase
    {
        public SorareBlockInfoProvider(ETHTPSContext context, IConfiguration configuration) : base(Products.Sorare, context, configuration)
        {
        }
    }
}
