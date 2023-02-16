using Castle.Core.Logging;

using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.GTPS;
using ETHTPS.API.BIL.Infrastructure.Services.DataServices.TPS;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.ResponseModels.ChartData.StackedChart;
using ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart;
using ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart.Extensions;
using ETHTPS.Data.ResponseModels;

using Microsoft.Extensions.Logging;

using System.Linq;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class ChartDataServiceservice : IChartDataServiceservice
    {
        private readonly ITPSService _tpsService;
        private readonly IGPSService _gpsService;
        private readonly IGTPSService _gtpsService;
        private readonly GeneralService _generalService;
        private readonly ILogger<ChartDataServiceservice> _logger;

        public ChartDataServiceservice(ITPSService tpsService, IGPSService gpsService, IGTPSService gtpsService, GeneralService generalService, ILogger<ChartDataServiceservice> logger)
        {
            _tpsService = tpsService;
            _gpsService = gpsService;
            _gtpsService = gtpsService;
            _generalService = generalService;
            _logger = logger;
        }

        public StreamchartModel GetStreamchartData(ChartDataRequestModel model)
        {
            var tpsData = _tpsService.Get(model, model.Interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(model.Count).Flatten();
            var gpsData = _gpsService.Get(model, model.Interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(model.Count).Flatten();
            var gtpsData = _gtpsService.Get(model, model.Interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(model.Count).Flatten();
            var providers = tpsData.SelectMany(x => x.Keys).Concat(gpsData.SelectMany(y => y.Keys)).Distinct();

            double maxtps = 0;
            double maxgps = 0;
            double maxgtps = 0;
            double[][] tps = new double[tpsData.Count()][];
            double[][] gps = new double[gpsData.Count()][];
            double[][] gtps = new double[gtpsData.Count()][];
            for (int i = 0; i < tpsData.Count(); i++)
            {
                tps[i] = tpsData.ElementAt(i).TakeLast(Math.Min(model.Count, tpsData.Count())).Select(x => x.Value.Value).ToArray();
                maxtps = Math.Max(maxtps, tps[i].Max());
            }
            for (int i = 0; i < gpsData.Count(); i++)
            {
                gps[i] = gpsData.ElementAt(i).TakeLast(Math.Min(model.Count, gpsData.Count())).Select(x => x.Value.Value).ToArray();
                maxgps = Math.Max(maxgps, gps[i].Max());
            }
            for (int i = 0; i < gtpsData.Count(); i++)
            {
                gtps[i] = gtpsData.ElementAt(i).TakeLast(Math.Min(model.Count, gtpsData.Count())).Select(x => x.Value.Value).ToArray();
                maxgtps = Math.Max(maxgtps, gtps[i].Max());
            }
            //Data has to be cumulative and without gaps
            //Let's first make it cumulative
            double cumulatedTPS = tps[0][0];
            double cumulatedGPS = gps[0][0];
            for (int i = 0; i < Math.Min(tps.Length, gps.Length); i++)
            {
                tps = Sort(tps, i);
                //i^th element of each series
                for (int j = 1; j < tps[i].Length; j++)
                {
                    cumulatedTPS += tps[i][j];
                    tps[i][j] = cumulatedTPS;

                    cumulatedGPS += gps[i][j];
                    gps[i][j] += cumulatedGPS;
                }
            }
            return new StreamchartModel()
            {
                Legend = new LegendModel()
                {
                    Keys = providers,
                    Colors = providers.Select(x => _generalService.ColorDictionary()[x])
                },
                TPSData = tps,
                GPSData = gps,
                GTPSData = gtps,
                MaxGPS = maxgps,
                MaxGTPS = maxgtps,
                MaxTPS = maxtps
            };
        }
        private static T[][] Sort<T>(T[][] data, int col)
        {
            Comparer<T> comparer = Comparer<T>.Default;
            Array.Sort<T[]>(data, (x, y) => comparer.Compare(x[col], y[col]));
            return data;
        }
        /// <summary>
        /// Example series: [{ x: "2020-01-03", y: 20 }]
        /// </summary>
        public StackedChartModel GetStackedChartData(ChartDataRequestModel model)
        {
            IPSService service = null;
            switch (model.DataType.ToUpper())
            {
                case "TPS":
                    service = _tpsService;
                    break;
                case "GPS":
                    service = _gpsService;
                    break;
                case "GTPS":
                    service = _gpsService;
                    break;
                default:
                    throw new ArgumentException($"Invalid data type \"{model.DataType}\"");
            }
            var data = service.Get(ProviderQueryModel.All, model.Interval).RemoveEmptyValues();
            foreach (var key in data.Keys)
            {
                data[key] = data[key].OrderBy(x => x.Data.FirstOrDefault()?.Date);
            }
            var result = new StackedChartModel()
            {
                Series = data.Keys.Select(key => new StackedChartSeries()
                {
                    DataPoints = data[key].Select(z => new StackedChartDataPoint()
                    {
                        X = z.Data.FirstOrDefault()?.Date,
                        Y = z.Data.FirstOrDefault()?.Value
                    }),
                    Provider = key
                })
            };
            var groupSummingPercentage = model.CombineSeriesWithAverageLessThanPercentage;
            result.Series = result.Series.OrderByDescending(x => x.DataPoints.Average(y => y.Y));

            var globalAverage = result.Series.Average(s => s.DataPoints.Average(x => x.Y ?? 0));
            var index = Enumerable.Range(1, result.Series.Count()).First(i => result.Series.TakeLast(i).Average(z => z.DataPoints.Average(y => y.Y
            .HasValue ? y.Y.Value : 0)) >= globalAverage * groupSummingPercentage / 100);

            var toBeRemoved = result.Series.TakeLast(index);
            var maxCount = toBeRemoved.Max(x => x.DataPoints.Count());
            var xTimestamps = toBeRemoved.First(x => x.DataPoints.Count() == maxCount).DataPoints.Select(x => x.X);
            var lastNSeriesAverages = Enumerable.Range(0, maxCount).Select(i => toBeRemoved?.Where(s => s.DataPoints.Count() > i).Average(x => (x.DataPoints.ElementAt(i)?.Y.HasValue ?? false) ? (x.DataPoints.ElementAt(i).Y.HasValue ? x.DataPoints.ElementAt(i).Y.Value : 0) : 0));
            var aggregatedSeries = Enumerable.Range(0, maxCount).Select(i => new StackedChartDataPoint()
            {
                X = xTimestamps.ElementAt(i),
                Y = lastNSeriesAverages.ElementAt(i)
            });

            result.Series = result.Series.Take(result.Series.Count() - index).Concat(new[]
            {
                new StackedChartSeries()
            {
                DataPoints = aggregatedSeries,
                Provider = "Others"
            }
            });
            return result;
        }
    }
}
