using ETHTPS.Data.Core.Models.DataPoints.XYPoints.Attributes;

namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints
{
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
