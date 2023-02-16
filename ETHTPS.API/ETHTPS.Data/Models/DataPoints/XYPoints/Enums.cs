using ETHTPS.Data.Core.Models.DataPoints.XYPoints.Attributes;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum XPointType
    {
        [UsesXYPoint<DatedXYDataPoint>]
        Date,
        [UsesXYPoint<NumericXYDataPoint>]
        Number,
        [UsesXYPoint<StringXYDataPoint>]
        String
    }
}
