using System;

namespace ETHTPS.Data.Core.Models.DataPoints.XYPoints.Attributes
{
    /// <summary>
    /// Specifies what kind of XY data point should be returned
    /// </summary>
    /// <typeparam name="TPoint"></typeparam>
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false)]
    public class UsesXYPoint<TPoint> : Attribute
        where TPoint : IDataPoint, IXYMultiConvertible, new()
    {
        public Type XPointType { get; private set; }
        public UsesXYPoint()
        {
            XPointType = typeof(TPoint);
        }
    }
}
