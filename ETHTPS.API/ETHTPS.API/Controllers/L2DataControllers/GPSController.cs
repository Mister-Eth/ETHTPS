using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers.L2DataControllers
{
    [Route("API/GPS/[action]")]
    public class GPSController : IPSService
    {
        private readonly IGPSService _gpsService;

        public GPSController(IGPSService gpsService)
        {
            _gpsService = gpsService;
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear([FromQuery] ProviderQueryModel model, int year)
        {
            return _gpsService.GeMonthlyDataByYear(model, year);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, string interval)
        {
            return _gpsService.Get(model, interval);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return _gpsService.Instant(model);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return _gpsService.Max(model);
        }
    }
}
