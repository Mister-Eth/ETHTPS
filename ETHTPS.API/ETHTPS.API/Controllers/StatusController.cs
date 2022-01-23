using ETHTPS.Services.BlockchainServices.Status;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("api/Status/[action]")]
    public class StatusController : IBlockInfoProviderStatusService
    {
        private readonly IBlockInfoProviderStatusService _blockInfoProviderStatusService;

        public StatusController(IBlockInfoProviderStatusService blockInfoProviderStatusService)
        {
            _blockInfoProviderStatusService = blockInfoProviderStatusService;
        }

        [HttpGet]
        public IDictionary<string, BlockInfoProviderStatusResult> GetBlockInfoProviderStatus(string provider)
        {
            return _blockInfoProviderStatusService.GetBlockInfoProviderStatus(provider);
        }
    }
}
