using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.Ethereum.Starkware.API.Models;

using Microsoft.Extensions.Configuration;

namespace ETHTPS.Services.Ethereum.Starkware
{
    [Provider("Sorare")]
    public class SorareBlockInfoProvider : StarkwareBlockInfoProviderBase
    {
        public SorareBlockInfoProvider(EthtpsContext context, IConfiguration configuration) : base(Products.Sorare, context, configuration)
        {
        }
    }
}
