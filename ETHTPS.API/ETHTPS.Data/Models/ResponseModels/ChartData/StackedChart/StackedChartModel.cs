using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Core.Models.ResponseModels.ChartData.StackedChart
{
    public class StackedChartModel
    {
        public IEnumerable<StackedChartSeries> Series { get; set; }
        public double MaxValue => Series.Max(x => x.MaxValue);
    }
}
