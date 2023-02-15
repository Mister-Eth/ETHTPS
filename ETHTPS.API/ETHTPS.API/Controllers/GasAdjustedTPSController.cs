using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.ResponseModels.DataPoints;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

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
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gasAdjustedTPSService).GeMonthlyDataByYear(model, year);
        }
        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get([FromQuery] ProviderQueryModel model, string interval)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Get(model, interval);
        }
        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant([FromQuery] ProviderQueryModel model)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Instant(model);
        }
        [HttpGet]
        public IDictionary<string, DataPoint> Max([FromQuery] ProviderQueryModel model)
        {
            return ((IPSDataProvider<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Max(model);
        }
    }
}
