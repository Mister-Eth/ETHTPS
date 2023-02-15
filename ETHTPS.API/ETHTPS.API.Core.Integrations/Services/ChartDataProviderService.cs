using Castle.Core.Logging;

using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.ChartData.Streamchart;
using ETHTPS.Data.Models.ResponseModels.ChartData.Streamchart.Extensions;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class ChartDataProviderService : IChartDataProviderService
    {
        private readonly TPSService _tpsService;
        private readonly GPSService _gpsService;
        private readonly GasAdjustedTPSService _gtpsService;
        private readonly GeneralService _generalService;

        public ChartDataProviderService(TPSService tpsService, GPSService gpsService, GasAdjustedTPSService gtpsService, GeneralService generalService)
        {
            _tpsService = tpsService;
            _gpsService = gpsService;
            _gtpsService = gtpsService;
            _generalService = generalService;
        }

        public StreamchartModel Get(ProviderQueryModel model, string interval, int count = 10)
        {
            var tpsData = _tpsService.Get(model, interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(count).Flatten();
            var gpsData = _gpsService.Get(model, interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(count).Flatten();
            var gtpsData = _gtpsService.Get(model, interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(count).Flatten();
            var providers = tpsData.SelectMany(x => x.Keys).Concat(gpsData.SelectMany(y => y.Keys)).Distinct();

            double maxtps = 0;
            double maxgps = 0;
            double maxgtps = 0;
            double[][] tps = new double[tpsData.Count()][];
            double[][] gps = new double[gpsData.Count()][];
            double[][] gtps = new double[gtpsData.Count()][];
            for (int i = 0; i < tpsData.Count(); i++)
            {
                tps[i] = tpsData.ElementAt(i).TakeLast(Math.Min(count, tpsData.Count())).Select(x => x.Value.Value).ToArray();
                maxtps = Math.Max(maxtps, tps[i].Max());
            }
            for (int i = 0; i < gpsData.Count(); i++)
            {
                gps[i] = gpsData.ElementAt(i).TakeLast(Math.Min(count, gpsData.Count())).Select(x => x.Value.Value).ToArray();
                maxgps = Math.Max(maxgps, gps[i].Max());
            }
            for (int i = 0; i < gtpsData.Count(); i++)
            {
                gtps[i] = gtpsData.ElementAt(i).TakeLast(Math.Min(count, gtpsData.Count())).Select(x => x.Value.Value).ToArray();
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
    }
}
