using ETHTPS.Data.Database;
using ETHTPS.Services.BlockchainServices;
using ETHTPS.Services.BlockchainServices.Scan.Implementations;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
#if DEBUG
    [Route("API/Test/[action]")]
    public class TestController : APIControllerBase
    {
        private readonly EtherscanBlockInfoProvider _etherscanBlockInfoProvider;
        public TestController(ETHTPSContext context, EtherscanBlockInfoProvider etherscanBlockInfoProvider) : base(context)
        {
            _etherscanBlockInfoProvider = etherscanBlockInfoProvider;
        }

        [HttpGet]
        public async Task<BlockInfo> GetBlockInfo(int blockNumber) => await _etherscanBlockInfoProvider.GetBlockInfoAsync(blockNumber);
    }
#endif
}
