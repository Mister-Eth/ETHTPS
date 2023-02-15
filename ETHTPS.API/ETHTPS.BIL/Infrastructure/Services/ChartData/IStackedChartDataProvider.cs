using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.ChartData.StackedChart;

namespace ETHTPS.API.BIL.Infrastructure.Services.ChartData
{
    public interface IStackedChartDataProvider
    {
        StackedChartModel GetStackedChartData(ChartDataRequestModel model);
    }
}
