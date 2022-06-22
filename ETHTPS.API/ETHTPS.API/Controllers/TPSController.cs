using ETHTPS.Services.PSServices;
using ETHTPS.Services.PSServices.Implementations;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/TPS/[action]")]
    public class TPSController : IPSService
    {
        private readonly TPSService _tpsService;

        public TPSController(TPSService tpsService)
        {
            _tpsService = tpsService;
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear([FromQuery] ProviderQueryModel model, int year)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).GeMonthlyDataByYear(model, year);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, string interval)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).Get(model, interval);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).Instant(model);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).Max(model);
        }
    }
}
