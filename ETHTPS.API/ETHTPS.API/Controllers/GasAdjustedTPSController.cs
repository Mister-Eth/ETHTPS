
using ETHTPS.API.Infrastructure.Services;
using ETHTPS.API.Infrastructure.Services.Implementations;
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
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(string provider, int year, string network = "Mainnet", bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).GeMonthlyDataByYear(provider, year, network, includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Get(provider, interval, network, includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant(bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Instant(includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max(string provider, string network = "Mainnet")
        {
            return ((IPSController<DataPoint, DataResponseModel>)_gasAdjustedTPSService).Max(provider, network);
        }
    }
}
