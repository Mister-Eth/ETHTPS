using ETHTPS.Data.Extensions;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.BlockTime;
using ETHTPS.Services.Ethereum.Models.JSONRPC;
using ETHTPS.Services.Infrastructure.Serialization;

using Microsoft.Extensions.Configuration;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum
{
    [Provider("Ethereum")]
    public class InfuraBlockInfoProvider : JSONRPCBlockInfoProviderBase
    {
        public InfuraBlockInfoProvider(IConfiguration configuration, EthereumBlockTimeProvider ethereumBlockTimeProvider) : base(configuration, "Infura")
        {
            BlockTimeSeconds = ethereumBlockTimeProvider.GetBlockTime();
        }
    }
}
