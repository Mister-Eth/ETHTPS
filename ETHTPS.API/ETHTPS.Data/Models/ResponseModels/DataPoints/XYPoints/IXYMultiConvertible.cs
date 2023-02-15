namespace ETHTPS.Data.Core.Models.ResponseModels.DataPoints.XYPoints
{
    public interface IXYMultiConvertible
    {
        DatedXYDataPoint ToDatedXYDataPoint();
        NumericXYDataPoint ToNumericXYDataPoint();
        StringXYDataPoint ToStringXYDataPoint();
    }
}
