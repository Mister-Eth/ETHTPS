using ETHTPS.API.Core.Infrastructure.Services.Implementations;
using ETHTPS.Data.Database.TimeWarp;
using ETHTPS.Data.Database.TimeWarp.Models;
using ETHTPS.Data.Models;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.API.TimeWarp.Controllers
{
    [Route("API/TimeWarp/[action]")]
    public class TimeWarpController
    {
        private readonly TimeWarpService _timeWarpService;
        private const string DEFAULT_SMOOTHING = "Instant";
        public TimeWarpController(TimeWarpService timeWarpService)
        {
            _timeWarpService = timeWarpService;
        }

        [HttpGet]
        public DateTime GetEarliestDate([FromQuery] APIKeyRequestModel model)
        {
            return ((ITimeWarpService)_timeWarpService).GetEarliestDate();
        }

        [HttpGet]
        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(ProviderQueryModel model, long timestamp, string smoothing = DEFAULT_SMOOTHING, int count = 30)
        {
            return ((ITimeWarpService)_timeWarpService).GetGasAdjustedTPSAt(model, timestamp, smoothing, count);
        }

        [HttpGet]
        public IEnumerable<DataPoint> GetGPSAt(ProviderQueryModel model, long timestamp, string smoothing = DEFAULT_SMOOTHING, int count = 30)
        {
            return ((ITimeWarpService)_timeWarpService).GetGPSAt(model, timestamp, smoothing, count);
        }

        [HttpGet]
        public Task<TimeWarpSyncProgressModel> GetSyncProgress(ProviderQueryModel model)
        {
            return ((ITimeWarpService)_timeWarpService).GetSyncProgress(model);
        }

        [HttpGet]
        public IEnumerable<DataPoint> GetTPSAt(ProviderQueryModel model, long timestamp, string smoothing = DEFAULT_SMOOTHING, int count = 30)
        {
            return ((ITimeWarpService)_timeWarpService).GetTPSAt(model, timestamp, smoothing, count);
        }

    }
}
