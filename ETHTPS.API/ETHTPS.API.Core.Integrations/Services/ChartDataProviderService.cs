using ETHTPS.API.BIL.Infrastructure.Services.ChartData;
using ETHTPS.API.Core.Integrations.MSSQL.Services.Data;
using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.ChartData.Nivo;
using ETHTPS.Data.Models.ResponseModels.ChartData.Nivo.Extensions;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class ChartDataProviderService : IChartDataProviderService
    {
        TPSService _tpsService;
        GPSService _gpsService;
        GasAdjustedTPSService _gtpsService;

        public ChartDataProviderService(TPSService tpsService, GPSService gpsService, GasAdjustedTPSService gtpsService)
        {
            _tpsService = tpsService;
            _gpsService = gpsService;
            _gtpsService = gtpsService;
        }

        public IDictionary<string, IEnumerable<IDictionary<string, DataPoint>>> Get(ProviderQueryModel model, string interval, int count = 10)
        {
            var tpsData = _tpsService.Get(model, interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(count).Flatten();
            var gpsData = _gpsService.Get(model, interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(count).Flatten();
            var gtpsData = _gtpsService.Get(model, interval).RemoveEmptyValues().OrderEachSet().TakeLatestN(count).Flatten();

            return new Dictionary<string, IEnumerable<IDictionary<string, DataPoint>>>()
            {
                { "tps", tpsData },
                { "gps", gpsData },
                { "gtps", gtpsData }
            };
        }
    }
}
