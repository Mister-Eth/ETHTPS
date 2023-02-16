using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public class DeedleTimeSeriesFormatter : IPSDataFormatter
    {
        public IEnumerable<TOutDataPoint> Convert<TInDataPoint, TOutDataPoint>(IEnumerable<TInDataPoint> data) where TOutDataPoint : IXYMultiConvertible
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IXYMultiConvertible> Format(List<DataResponseModel> source, DataRequestModel requestModel)
        {
            var result = source.Transform().RemoveInvalidDataPoints();
            return result;
        }
    }

    public static class TimeSeriesExtensions
    {
        public static IEnumerable<IXYMultiConvertible> Transform(this IEnumerable<DataResponseModel> source) => source.Select(x => new DatedXYDataPoint()
        {
            X = x.Data.FirstOrDefault()?.Date ?? DateTime.MinValue,
            Y = x.Data.FirstOrDefault()?.Value ?? 0
        });

        public static IEnumerable<IXYMultiConvertible> RemoveInvalidDataPoints(this IEnumerable<IXYMultiConvertible> source) => source.Where(x => x.ToDatedXYDataPoint().X != DateTime.MinValue);
    }
}
