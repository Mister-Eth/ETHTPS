using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Starkware.API.Models;

using Microsoft.Extensions.Configuration;

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
