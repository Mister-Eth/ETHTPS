using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;

namespace ETHTPS.API.Controllers
{
    [Route("API/TPS/[action]")]
    [Authorize(AuthenticationSchemes = "APIKey")]
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
