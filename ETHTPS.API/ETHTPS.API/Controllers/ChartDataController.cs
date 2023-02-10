﻿using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.Core.Controllers;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.ChartData.Nivo;
using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ChartDataController : APIControllerBase
    {
        private readonly IChartDataProviderService _chartDataProviderService;

        public ChartDataController(IChartDataProviderService chartDataProviderService)
        {
            _chartDataProviderService = chartDataProviderService;
        }

        [HttpGet]
        public object GetStreamchartData([FromQuery] ProviderQueryModel model, string interval, int count = 15)
        {
            return _chartDataProviderService.Get(model, interval, count);
        }
    }
}
