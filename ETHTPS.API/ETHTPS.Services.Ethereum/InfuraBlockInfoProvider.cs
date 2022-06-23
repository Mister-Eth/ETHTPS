using ETHTPS.Data.Extensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Attributes;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.Ethereum.Models.JSONRPC;
using ETHTPS.Services.Infrastructure.Serialization;

using Hangfire;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static ETHTPS.Services.Constants.CronConstants;
using static ETHTPS.Services.Constants.Queues;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Ethereum")]
    [RunEvery(Every5s)]
    [Queue(TPSUPDATERQUEUE)]
    public class InfuraBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public InfuraBlockInfoProvider(IConfiguration configuration, EthereumBlockTimeProvider ethereumBlockTimeProvider) : base(configuration, "Infura")
        {
            BlockTimeSeconds = ethereumBlockTimeProvider.GetBlockTime();
        }
    }
}
