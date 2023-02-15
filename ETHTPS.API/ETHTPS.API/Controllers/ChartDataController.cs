using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.Core.Controllers;
using ETHTPS.Data.Models.Queries;
using ETHTPS.Data.Models.ResponseModels.ChartData.StackedChart;
using ETHTPS.Data.Models.ResponseModels.ChartData.Streamchart;

using Microsoft.AspNetCore.Mvc;

using System.Linq;

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
        public StreamchartModel GetStreamchartData([FromQuery] ChartDataRequestModel model)
        {
            return _chartDataProviderService.GetStreamchartData(model);
        }

        [HttpGet]
        public StackedChartModel GetStackedChartData([FromQuery] ChartDataRequestModel model)
        {
            return _chartDataProviderService.GetStackedChartData(model);
        }
    }
}
