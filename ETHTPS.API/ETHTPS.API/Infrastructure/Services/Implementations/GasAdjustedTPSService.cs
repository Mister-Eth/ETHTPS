using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ETHTPS.API.Infrastructure.Services;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.Infrastructure.Services.Implementations
{
    public class GasAdjustedTPSService : HistoricalMethodsServiceBase, IPSService
    {
        private readonly GPSService _gpsService;
        public GasAdjustedTPSService(GPSService gpsService, ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders):base(context, historicalDataProviders)
        {
            _gpsService = gpsService;
        }

        public IDictionary<string, IEnumerable<DataResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var data = _gpsService.Get(provider, interval, network, includeSidechains);
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

        public IDictionary<string, IEnumerable<DataPoint>> Instant(bool includeSidechains = true)
        {
            Dictionary<string, List<DataPoint>> gasAdjustedTPS = new();
            var instantGPS = _gpsService.Instant(includeSidechains);
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

        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(string provider, int year, string network = "Mainnet", bool includeSidechains = true)
        {
            var data = Get(provider, "All", network, includeSidechains);
            foreach (var key in data.Keys)
            {
                data[key] = data[key].Where(x => x.Data.First().Date.Year == year);
            }
            return data;
        }

        public IDictionary<string, DataPoint> Max(string provider, string network = "Mainnet")
        {
            Dictionary<string, DataPoint> gasAdjustedTPS = new();
            var maxGPS = _gpsService.Max(provider, network);
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
