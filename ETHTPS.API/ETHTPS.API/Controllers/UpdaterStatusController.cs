﻿using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.Core.Controllers;
using ETHTPS.Data.Models;
using ETHTPS.Data.Models.DataUpdater;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UpdaterStatusController : APIControllerBase
    {
        private readonly IDataUpdaterStatusGetter _dataUpdaterService;

        public UpdaterStatusController(IDataUpdaterStatusService dataUpdaterService)
        {
            _dataUpdaterService = dataUpdaterService;
        }

        [HttpGet]
        public IEnumerable<LiveUpdaterStatus> GetAllStatuses([FromQuery] APIKeyRequestModel model)
        {
            return _dataUpdaterService.GetAllStatuses();
        }

        [HttpGet]
        public LiveUpdaterStatus GetStatusFor(string provider, string updaterType, [FromQuery] APIKeyRequestModel model)
        {
            return _dataUpdaterService.GetStatusFor(provider, Enum.Parse<UpdaterType>(updaterType));
        }

        [HttpGet]
        public IEnumerable<LiveUpdaterStatus> GetStatusesFor(string provider, [FromQuery] APIKeyRequestModel model)
        {
            return _dataUpdaterService.GetStatusFor(provider);
        }
    }
}
