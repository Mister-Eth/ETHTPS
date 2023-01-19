﻿using ETHTPS.Data.Models.Query;
using ETHTPS.Services.BlockchainServices.Status;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

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
        public IDictionary<string, BlockInfoProviderStatusResult> GetBlockInfoProviderStatus(ProviderQueryModel model)
        {
            return _blockInfoProviderStatusService.GetBlockInfoProviderStatus(model);
        }
    }
}
