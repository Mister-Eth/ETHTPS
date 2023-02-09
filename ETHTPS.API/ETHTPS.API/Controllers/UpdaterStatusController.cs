using ETHTPS.API.BIL.Infrastructure.Models.DataUpdater;
using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.API.Core.Controllers;
using ETHTPS.Data.Models;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UpdaterStatusController : APIControllerBase
    {
        private readonly IDataUpdaterStatusGetter _dataUpdaterService;

        public UpdaterStatusController(IDataUpdaterService dataUpdaterService)
        {
            _dataUpdaterService = dataUpdaterService;
        }

        [HttpGet]
        public IEnumerable<string> GetAllStatuses([FromQuery] APIKeyRequestModel model)
        {
            return _dataUpdaterService.GetAllStatuses();
        }

        [HttpGet]
        public LiveUpdaterStatus GetStatusFor(string provider, string updaterType, [FromQuery] APIKeyRequestModel model)
        {
            return _dataUpdaterService.GetStatusFor(provider, updaterType);
        }

        [HttpGet]
        public IEnumerable<LiveUpdaterStatus> GetStatusesFor(string provider, [FromQuery] APIKeyRequestModel model)
        {
            return _dataUpdaterService.GetStatusFor(provider);
        }
    }
}
