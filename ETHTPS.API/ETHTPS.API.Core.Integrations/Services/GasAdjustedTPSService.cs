using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Services;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class GasAdjustedTPSService : HistoricalMethodsServiceBase, IPSService
    {
        private readonly GPSService _gpsService;
        public GasAdjustedTPSService(GPSService gpsService, EthtpsContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {
            _gpsService = gpsService;
        }

        public IDictionary<string, IEnumerable<DataResponseModel>> Get(ProviderQueryModel model, string interval)
        {
            var data = _gpsService.Get(model, interval);
            foreach (var key in data.Keys)
            {
                data[key] = data[key].Select(x => new DataResponseModel()
                {
                    Provider = x.Provider,
                    Data = new List<DataPoint>()
                    {
                        new DataPoint()
                        {
                            Date = x.Data.First().Date,
                            Value = x.Data.First().Value / 21000
                        }
                    }
                });
            }
            return data;
        }

        public IDictionary<string, IEnumerable<DataPoint>> Instant(ProviderQueryModel model)
        {
            Dictionary<string, List<DataPoint>> gasAdjustedTPS = new();
            var instantGPS = _gpsService.Instant(model);
            foreach (var entry in instantGPS)
            {
                gasAdjustedTPS.Add(entry.Key, new List<DataPoint>()
                {
                    new DataPoint()
                {
                    Date = instantGPS[entry.Key].First().Date,
                    Value = instantGPS[entry.Key].First().Value / 21000
                }
                });
            }
            return gasAdjustedTPS.ToDictionary(x => x.Key, x => x.Value.AsEnumerable());
        }

        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(ProviderQueryModel model, int year)
        {
            var data = Get(model, Constants.All);
            foreach (var key in data.Keys)
            {
                data[key] = data[key].Where(x => x.Data.First().Date.Year == year);
            }
            return data;
        }

        public IDictionary<string, DataPoint> Max(ProviderQueryModel model)
        {
            Dictionary<string, DataPoint> gasAdjustedTPS = new();
            var maxGPS = _gpsService.Max(model);
            foreach (var entry in maxGPS)
            {
                gasAdjustedTPS.Add(entry.Key, new DataPoint()
                {
                    Date = maxGPS[entry.Key].Date,
                    Value = maxGPS[entry.Key].Value / 21000
                });
            }
            return gasAdjustedTPS;
        }
    }
}
