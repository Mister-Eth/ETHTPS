using ETHTPS.API.Infrastructure.Services;
using ETHTPS.API.Infrastructure.Services.Implementations;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(string provider, int year, string network = "Mainnet", bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gpsService).GeMonthlyDataByYear(provider, year, network, includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gpsService).Get(provider, interval, network, includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant(bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gpsService).Instant(includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max(string provider, string network = "Mainnet")
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gpsService).Max(provider, network);
        }
    }
}
