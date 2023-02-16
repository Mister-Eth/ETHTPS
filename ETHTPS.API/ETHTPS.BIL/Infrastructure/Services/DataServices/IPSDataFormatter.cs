using ETHTPS.Data.Core.Models.DataPoints.XYPoints;

namespace ETHTPS.API.BIL.Infrastructure.Services.DataServices
{
    public interface IPSDataFormatter
    {
        IEnumerable<TOutDataPoint> Convert<TInDataPoint, TOutDataPoint>(IEnumerable<TInDataPoint> data)
            where TOutDataPoint : IXYMultiConvertible;
    }
}
