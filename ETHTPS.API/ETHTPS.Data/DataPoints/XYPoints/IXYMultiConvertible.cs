namespace ETHTPS.Data.Core.DataPoints.XYPoints
{
    public interface IXYMultiConvertible
    {
        DatedXYDataPoint ToDatedXYDataPoint();
        NumericXYDataPoint ToNumericXYDataPoint();
        StringXYDataPoint ToStringXYDataPoint();
    }
}
