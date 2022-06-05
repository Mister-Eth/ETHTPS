using ETHTPS.Data.ResponseModels;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models.Pages.Chart
{
    public class ChartData : IChartDataType
    {
        public IDictionary<string, IEnumerable<DataResponseModel>> Data { get; set; }
        
        [JsonConverter(typeof(StringEnumConverter))]
        public DataType DataType { get; set; }
    }
}
