using ETHTPS.Data.Core.Extensions;

using System;

namespace ETHTPS.Data.Core.DataPoints.XYPoints
{
    public class DatedXYDataPoint : XYDataPointBase<DateTime, double>
    {
        public DatedXYDataPoint() : base() { }
        public DatedXYDataPoint(DateTime x, double y) : base(x, y)
        {

        }

        public override DatedXYDataPoint ToDatedXYDataPoint() => new(X, Y);

        public override NumericXYDataPoint ToNumericXYDataPoint() => new(X.ToUnixTime(), Y);

        public override StringXYDataPoint ToStringXYDataPoint() => new(X.ToString(), Y);
    }
}
