namespace ETHTPS.Data.Core.Models.ResponseModels.DataPoints.XYPoints
{
    public abstract class XYDataPointBase<TX, TY> : IDataPoint, IXYMultiConvertible
    {
        protected XYDataPointBase() { }

        protected XYDataPointBase(TX? x, TY? y)
        {
            X = x;
            Y = y;
        }

        public TX? X { get; set; }
        public TY? Y { get; set; }

        public abstract DatedXYDataPoint ToDatedXYDataPoint();
        public abstract NumericXYDataPoint ToNumericXYDataPoint();
        public abstract StringXYDataPoint ToStringXYDataPoint();
    }
}
