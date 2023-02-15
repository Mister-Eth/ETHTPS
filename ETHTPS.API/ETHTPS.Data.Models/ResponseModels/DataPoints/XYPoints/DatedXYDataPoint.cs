using ETHTPS.Data.Core.Extensions;

namespace ETHTPS.Data.Models.ResponseModels.DataPoints.XYPoints
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
