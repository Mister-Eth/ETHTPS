using ETHTPS.Data.Core;
using ETHTPS.Data.ResponseModels;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

using System.Collections.Generic;

namespace ETHTPS.Data.Models.Pages.Chart
{
    public class ChartData : IChartDataType
    {
        public IDictionary<string, IEnumerable<DataResponseModel>> Data { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public DataType DataType { get; set; }
    }
}
