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
    [Route("API/TPS/[action]")]
    public class TPSController : IPSService
    {
        private readonly TPSService _tpsService;

        public TPSController(TPSService tpsService)
        {
            _tpsService = tpsService;
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(string provider, int year, string network = "Mainnet", bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).GeMonthlyDataByYear(provider, year, network, includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).Get(provider, interval, network, includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant(bool includeSidechains = true)
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).Instant(includeSidechains);
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max(string provider, string network = "Mainnet")
        {
            return ((IPSController<DataPoint, DataResponseModel>)_tpsService).Max(provider, network);
        }
    }
}
