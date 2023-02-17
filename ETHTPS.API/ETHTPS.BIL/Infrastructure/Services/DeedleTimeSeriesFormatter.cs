using Deedle;

using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using System.Linq;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public class DeedleTimeSeriesFormatter : IPSDataFormatter
    {
        public IEnumerable<TOutDataPoint> Convert<TInDataPoint, TOutDataPoint>(IEnumerable<TInDataPoint> data) where TOutDataPoint : IXYMultiConvertible
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IXYMultiConvertible> Format(List<DataResponseModel> source, L2DataRequestModel requestModel)
        {
            IEnumerable<IXYMultiConvertible> result = Enumerable.Empty<IXYMultiConvertible>();
            var partial = source.Transform()
                           .RemoveInvalidDataPoints()
                           .ToTimeSeries()
                           .FillMissing(Direction.Forward);
            if (requestModel.BucketOptions.UseTimeBuckets)
            {
                var bucketSize = requestModel.BucketOptions.BucketSize;
                if (requestModel.BucketOptions.BucketSize == TimeInterval.Auto)
                {
                    bucketSize = requestModel.AutoInterval;
                }
                /*
                var f = bucketSize.ExtractTimeGrouping().GetKeyExtractionFunction();
                var groups = result.GroupBy(x => f(x.Key));
                //Average all values in the same time bucket
                groups.Select(kvp => KeyValue.Create(kvp.Key, kvp.Value.Select(x => x.Value).Mean()));
                */
                var keyGenerator = bucketSize.ExtractTimeGrouping().GetKeyExtractionFunction();
                var f = bucketSize.ExtractTimeGrouping().GetAggregationFunction();
                var groups = partial.SortByKey()
                                    .Aggregate(Aggregation.ChunkWhile(f),
                       chunk => KeyValue.Create(keyGenerator(chunk.Data.FirstKey()), chunk.Data.ValueCount > 0 ? OptionalValue.Create(chunk.Data.Mean()) : OptionalValue.Empty<double>()));
                result = groups.GetAllObservations().Select(kvp => new DatedXYDataPoint(new DateTime(kvp.Key), kvp.Value.ValueOrDefault));
            }

            return result;
        }
    }

    public static class TimeSeriesExtensions
    {
        public static IEnumerable<IXYMultiConvertible> Transform(this IEnumerable<DataResponseModel> source) => source.Select(x => new DatedXYDataPoint()
        {
            X = x.Data.FirstOrDefault()?.Date ?? DateTime.MinValue,
            Y = x.Data.FirstOrDefault()?.Value ?? 0
        }).OrderBy(x => x.Y);

        public static IEnumerable<IXYMultiConvertible> RemoveInvalidDataPoints(this IEnumerable<IXYMultiConvertible> source) => source.Where(x => x.ToDatedXYDataPoint().X != DateTime.MinValue);

        public static Series<DateTime, double> ToTimeSeries(this IEnumerable<IXYMultiConvertible> source)
        {
            var result = new SeriesBuilder<DateTime, double>();
            foreach (var entry in source.Select(x => x.ToDatedXYDataPoint()))
            {
                result.Add(entry.X, entry.Y);
            }
            return result.Series;
        }

    }
}
