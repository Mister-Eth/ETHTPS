using Deedle;

using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Data.Core.Models.DataPoints.XYPoints;
using ETHTPS.Data.Core.Models.Pages;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.ResponseModels.L2s;

using System.Linq;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public class DeedleTimeSeriesFormatter : IPSDataFormatter
    {
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
                       chunk => KeyValue.Create(keyGenerator(chunk.Data.FirstKey()), chunk.Data.ValueCount > 0 ? OptionalValue.Create(Math.Round(chunk.Data.Mean(), 2)) : OptionalValue.Empty<double>()));
                result = groups.GetAllObservations().Select(kvp => new DatedXYDataPoint(new DateTime(kvp.Key), kvp.Value.ValueOrDefault));
            }
            else
            {
                result = partial.GetAllObservations().Select(kvp => new DatedXYDataPoint(kvp.Key, kvp.Value.ValueOrDefault));
            }
            return result.Convert(requestModel.ReturnXAxisType);
        }

        public IEnumerable<Dataset> MakeEqualLength(IEnumerable<Dataset> datasets, XPointType targetType)
        {
            //1. Datasets to series
            var series = datasets.Select(x => x.DataPoints.ToTimeSeries());
            var frame = Frame.FromColumns(series.Select((x, i) => KeyValuePair.Create(datasets.ElementAt(i).Provider, x)));
            ;
            var rowKeys = frame.RowKeys.ToArray();
            for (int i = 0; i < datasets.Count(); i++)
            {
                var dataset = datasets.ElementAt(i);
                //Have to build the datasets manually :(
                List<DatedXYDataPoint> points = new();
                foreach (var rowKey in rowKeys)
                {
                    points.Add(new DatedXYDataPoint()
                    {
                        X = rowKey,
                        Y = frame[dataset.Provider].ContainsKey(rowKey) ? frame[dataset.Provider][rowKey] : 0
                    });
                }
                //dataset.DataPoints = points.Convert(targetType);
                yield return new Dataset(points.Convert(targetType), dataset.Provider, dataset.SimpleAnalysis != null, dataset.ComplexAnalysis != null);
            }
            var f = datasets.Select(x => x.DataPoints.Count()).ToArray();
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
            var groups = source.Select(x => x.ToDatedXYDataPoint()).GroupBy(x => x.X); //There may be multiple entries with the same date
            foreach (var group in groups)
            {
                result.Add(group.Key, group.Average(x => x.Y));
            }
            return result.Series;
        }

        public static IEnumerable<IXYMultiConvertible> Convert(this IEnumerable<IXYMultiConvertible> source, XPointType target)
        {
            switch (target)
            {
                case XPointType.String:
                    source = source.Select(x => x.ToStringXYDataPoint());
                    break;
                case XPointType.Date:
                    source = source.Select(x => x.ToDatedXYDataPoint());
                    break;
                case XPointType.Number:
                    source = source.Select(x => x.ToNumericXYDataPoint());
                    break;
                default:
                    throw new ArgumentOutOfRangeException(target.ToString());
            }
            return source;
        }
    }
}
