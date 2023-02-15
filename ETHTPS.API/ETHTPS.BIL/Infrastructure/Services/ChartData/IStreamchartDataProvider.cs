using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart;

namespace ETHTPS.API.BIL.Infrastructure.Services.ChartData
{
    public interface IStreamchartDataProvider
    {
        StreamchartModel GetStreamchartData(ChartDataRequestModel model);
    }
}
