using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.ChartData.Streamchart;

namespace ETHTPS.API.BIL.Infrastructure.Services.ChartData
{
    public interface IStreamchartDataProvider
    {
        StreamchartModel GetStreamchartData(ChartDataRequestModel model);
    }
}
