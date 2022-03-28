using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices.Starkware.API.Models;

using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Starkware
{
    [Provider("DiversiFi")]
    public class DiversiFiBlockInfoProvider : StarkwareBlockInfoProviderBase
    {
        public DiversiFiBlockInfoProvider(ETHTPSContext context, IConfiguration configuration) : base(Products.DiversiFi, context, configuration)
        {
        }
    }
}
