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

            double[][] tps = new double[tpsData.Count()][];
            double[][] gps = new double[gpsData.Count()][];
            double[][] gtps = new double[gtpsData.Count()][];
            for (int i = 0; i < tpsData.Count(); i++)
            {
                tps[i] = tpsData.ElementAt(i).TakeLast(Math.Min(count, tpsData.Count())).Select(x => x.Value.Value).ToArray();
            }
            for (int i = 0; i < gpsData.Count(); i++)
            {
                gps[i] = gpsData.ElementAt(i).TakeLast(Math.Min(count, gpsData.Count())).Select(x => x.Value.Value).ToArray();
            }
            for (int i = 0; i < gtpsData.Count(); i++)
            {
                gtps[i] = gtpsData.ElementAt(i).TakeLast(Math.Min(count, gtpsData.Count())).Select(x => x.Value.Value).ToArray();
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
                GTPSData = gtps
            };
        }
    }
}
