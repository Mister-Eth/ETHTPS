using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart
{
    public class LegendModel
    {
        public IEnumerable<string> Keys { get; set; }
        public IEnumerable<string> Colors { get; set; }
    }
}
