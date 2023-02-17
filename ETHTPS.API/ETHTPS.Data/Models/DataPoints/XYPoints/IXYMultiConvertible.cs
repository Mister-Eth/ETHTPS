namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints
{
    public interface IXYMultiConvertible
    {
        DatedXYDataPoint ToDatedXYDataPoint();
        NumericXYDataPoint ToNumericXYDataPoint();
        StringXYDataPoint ToStringXYDataPoint();
        public double Y { get; set; }
    }
}
