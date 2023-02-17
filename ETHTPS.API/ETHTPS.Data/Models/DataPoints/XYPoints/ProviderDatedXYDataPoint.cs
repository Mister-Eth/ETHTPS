using ETHTPS.Data.Core.Extensions;

using System;

namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints
{
    public class ProviderDatedXYDataPoint : XYDataPointBase<DateTime>, IProviderXYMultiConvertible
    {
        public ProviderDatedXYDataPoint() : base() { }
        public ProviderDatedXYDataPoint(DateTime x, double y, string provider) : base(x, y)
        {
            Provider = provider;
        }

        public string Provider { get; set; }
        public override DatedXYDataPoint ToDatedXYDataPoint() => new(X, Y);
        public override NumericXYDataPoint ToNumericXYDataPoint() => new(X.ToUnixTime(), Y);
        public override StringXYDataPoint ToStringXYDataPoint() => new(X.ToString(), Y);
    }
}
