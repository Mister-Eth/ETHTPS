namespace ETHTPS.Data.Core.DataPoints.XYPoints.Attributes
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
