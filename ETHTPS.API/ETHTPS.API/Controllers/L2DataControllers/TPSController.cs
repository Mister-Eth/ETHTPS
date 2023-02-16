using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.Data.Core;

namespace ETHTPS.API.Controllers.L2DataControllers
{
    [Route("api/v2/TPS/[action]")]
    [Authorize(AuthenticationSchemes = "APIKey")]
    public class TPSController : IPSService
    {
        private readonly ITPSService _tpsService;

        public TPSController(ITPSService tpsService)
        {
            _tpsService = tpsService;
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GetMonthlyDataByYear([FromQuery] ProviderQueryModel model, int year)
        {
            return _tpsService.GetMonthlyDataByYear(model, year);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, TimeInterval interval)
        {
            return _tpsService.Get(model, interval);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return _tpsService.Instant(model);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return _tpsService.Max(model);
        }
    }
}
