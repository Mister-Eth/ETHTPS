using System;

namespace ETHTPS.Data.Core.Models.ResponseModels.DataPoints.XYPoints
{
    public class StringXYDataPoint : XYDataPointBase<string, double>
    {
        public StringXYDataPoint() : base() { }
        public StringXYDataPoint(string? x, double y) : base(x, y)
        {

        }

        public override DatedXYDataPoint ToDatedXYDataPoint()
        {
            DateTime date;
            if (DateTime.TryParse(X, out date)) return new(date, Y);
            return new(DateTime.MinValue, Y);
        }

        public override NumericXYDataPoint ToNumericXYDataPoint() => new(Convert.ToDouble(X?.GetHashCode()), Y);

        public override StringXYDataPoint ToStringXYDataPoint() => new(X, Y);
    }
}
