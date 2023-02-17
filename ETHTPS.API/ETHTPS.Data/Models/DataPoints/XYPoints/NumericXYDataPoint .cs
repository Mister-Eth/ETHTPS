using ETHTPS.Data.Core.Extensions;

using System;

namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints
{
    /// <summary>
    /// Represents a TPS/GPS/GTPS data point
    /// </summary>
    public class NumericXYDataPoint : XYDataPointBase<double>
    {
        public NumericXYDataPoint() : base() { }
        public NumericXYDataPoint(double x, double y) : base(x, y)
        {

        }

        public override DatedXYDataPoint ToDatedXYDataPoint() => new(DateTimeExtensions.FromUnixTime(Convert.ToInt64(X)), Y);

        public override NumericXYDataPoint ToNumericXYDataPoint() => this;

        public override StringXYDataPoint ToStringXYDataPoint() => new(X.ToString(), Y);
    }
}
