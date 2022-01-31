using ETHTPS.API.Infrastructure.Services;
using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.Database.TimeWarp;
using ETHTPS.Data.Database.TimeWarp.Models;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/TimeWarp/[action]")]
    public class TimeWarpController : ITimeWarpService
    {
        private readonly TimeWarpService _timeWarpService;

        public TimeWarpController(TimeWarpService timeWarpService)
        {
            _timeWarpService = timeWarpService;
        }

        [HttpGet]
        public DateTime GetEarliestDate()
        {
            return ((ITimeWarpService)_timeWarpService).GetEarliestDate();
        }

        [HttpGet]
        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(long timestamp, string network = "Mainnet", int count = 30)
        {
            return ((ITimeWarpService)_timeWarpService).GetGasAdjustedTPSAt(timestamp, network, count);
        }

        [HttpGet]
        public IEnumerable<DataPoint> GetGPSAt(long timestamp, string network = "Mainnet", int count = 30)
        {
            return ((ITimeWarpService)_timeWarpService).GetGPSAt(timestamp, network, count);
        }

        [HttpGet]
        public Task<TimeWarpSyncProgressModel> GetSyncProgress(string provider, string network)
        {
            return ((ITimeWarpService)_timeWarpService).GetSyncProgress(provider, network);
        }

        [HttpGet]
        public IEnumerable<DataPoint> GetTPSAt(long timestamp, string network = "Mainnet", int count = 30)
        {
            return ((ITimeWarpService)_timeWarpService).GetTPSAt(timestamp, network, count);
        }

    }
}
