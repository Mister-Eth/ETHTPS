using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;

namespace ETHTPS.Data.Models.Pages.Chart
{
    public abstract class RequestModelWithChartBase : ProviderQueryModel, IRequestModel, IChartDataType
    {
        public TimeInterval Interval { get; set; } = TimeInterval.OneMonth;
        public DataType DataType { get; set; } = DataType.TPS;
    }
}
