using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.Core.Controllers;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.ResponseModels.ChartData.StackedChart;
using ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart;

using Microsoft.AspNetCore.Mvc;

using System.Linq;

namespace ETHTPS.API.Controllers
{
    [Route("/api/v3/ChartData/[action]")]
    public class ChartDataController : APIControllerBase
    {
        private readonly IChartDataServiceservice _chartDataServiceservice;

        public ChartDataController(IChartDataServiceservice chartDataServiceservice)
        {
            _chartDataServiceservice = chartDataServiceservice;
        }

        [HttpGet]
        public StreamchartModel GetStreamchartData([FromQuery] ChartDataRequestModel model)
        {
            return _chartDataServiceservice.GetStreamchartData(model);
        }

        [HttpGet]
        public StackedChartModel GetStackedChartData([FromQuery] ChartDataRequestModel model)
        {
            return _chartDataServiceservice.GetStackedChartData(model);
        }
    }
}
