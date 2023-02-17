namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints
{
    public abstract class XYDataPointBase<TX> : IDataPoint, IXYMultiConvertible
    {
        protected XYDataPointBase() { }

        protected XYDataPointBase(TX? x, double y)
        {
            X = x;
            Y = y;
        }

        public TX? X { get; set; }
        public double Y { get; set; }

        public abstract DatedXYDataPoint ToDatedXYDataPoint();
        public abstract NumericXYDataPoint ToNumericXYDataPoint();
        public abstract StringXYDataPoint ToStringXYDataPoint();
    }
}
