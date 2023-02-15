using ETHTPS.Data.Core.Extensions;

namespace ETHTPS.Data.Models.ResponseModels.DataPoints.XYPoints
{
    /// <summary>
    /// Represents a TPS/GPS/GTPS data point
    /// </summary>
    public class NumericXYDataPoint : XYDataPointBase<double, double>
    {
        public NumericXYDataPoint() : base() { }
        public NumericXYDataPoint(double x, double y) : base(x, y)
        {

        }

        public override DatedXYDataPoint ToDatedXYDataPoint() => new(DateTimeExtensions.FromUnixTime(Convert.ToInt64(X)), Y);

        public override NumericXYDataPoint ToNumericXYDataPoint() => new(X, Y);

        public override StringXYDataPoint ToStringXYDataPoint() => new(X.ToString(), Y);
    }
}
