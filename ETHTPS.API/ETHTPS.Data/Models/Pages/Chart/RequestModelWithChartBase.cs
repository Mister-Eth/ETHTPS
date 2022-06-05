using ETHTPS.Data.Models.Query;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models.Pages.Chart
{
    public abstract class RequestModelWithChartBase : ProviderQueryModel, IRequestModel, IChartDataType
    {
        public TimeInterval Interval { get; set; } = TimeInterval.OneMonth;
        public DataType DataType { get; set; } = DataType.TPS;
    }
}
