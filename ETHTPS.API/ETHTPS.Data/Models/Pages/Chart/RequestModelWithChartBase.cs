using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

namespace ETHTPS.Data.Core.Models.Pages.Chart
{
    public abstract class RequestModelWithChartBase : ProviderQueryModel, IRequestModel, IChartDataType
    {
        public TimeInterval Interval { get; set; } = TimeInterval.OneMonth;
        public DataType DataType { get; set; } = DataType.TPS;
    }
}
