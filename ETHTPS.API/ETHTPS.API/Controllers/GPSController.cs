using ETHTPS.API.BIL.Infrastructure.Services.DataProviders;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.DataPoints;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("API/GPS/[action]")]
    public class GPSController : IPSService
    {
        private readonly GPSService _gpsService;

        public GPSController(GPSService gpsService)
        {
            _gpsService = gpsService;
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear([FromQuery] ProviderQueryModel model, int year)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gpsService).GeMonthlyDataByYear(model, year);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, string interval)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gpsService).Get(model, interval);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gpsService).Instant(model);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gpsService).Max(model);
        }
    }
}
