using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core.Models.ResponseModels.DataPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

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
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_tpsService).GeMonthlyDataByYear(model, year);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, string interval)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_tpsService).Get(model, interval);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_tpsService).Instant(model);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_tpsService).Max(model);
        }
    }
}
