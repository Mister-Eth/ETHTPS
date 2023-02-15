
namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints.Attributes
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
