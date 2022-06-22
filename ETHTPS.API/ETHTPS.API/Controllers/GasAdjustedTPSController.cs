
using ETHTPS.Services.PSServices;
using ETHTPS.Services.PSServices.Implementations;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/GasAdjustedTPS/[action]")]
    public class GasAdjustedTPSController : IPSService
    {
        private readonly GasAdjustedTPSService _gasAdjustedTPSService;

        public GasAdjustedTPSController(GasAdjustedTPSService gasAdjustedTPSService)
        {
            _gasAdjustedTPSService = gasAdjustedTPSService;
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear([FromQuery] ProviderQueryModel model, int year)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).GeMonthlyDataByYear(model, year);
        }
        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, string interval)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Get(model, interval);
        }
        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Instant(model);
        }
        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Max(model);
        }
    }
}
