using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Starkware.API.Models;
using ETHTPS.Services.BlockchainServices.Attributes;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hangfire;
using static ETHTPS.Services.Constants.CronConstants;
using static ETHTPS.Services.Constants.Queues;

namespace ETHTPS.Services.Ethereum.Starkware
{
    [Provider("Sorare")]
    [RunEvery(EveryHour)]
    [Queue(TPSUPDATERQUEUE)]
    public class SorareBlockInfoProvider : StarkwareBlockInfoProviderBase
    {
        public SorareBlockInfoProvider(ETHTPSContext context, IConfiguration configuration) : base(Products.Sorare, context, configuration)
        {
        }
    }
}
