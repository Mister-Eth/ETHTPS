using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/GasAdjustedTPS/[action]")]
    public class GasAdjustedTPSController : APIControllerWithHistoricalMethodsBase, IPSController<DataPoint, DataResponseModel>
    {
        public GasAdjustedTPSController(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {
        }

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var gpsController = new GPSController(Context, HistoricalDataProviders);
            var data = gpsController.Get(provider, interval, network, includeSidechains);
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

        [HttpGet]
        public IDictionary<string, IEnumerable<DataPoint>> Instant(bool includeSidechains = true)
        {
            Dictionary<string, List<DataPoint>> gasAdjustedTPS = new();
            var gpsController = new GPSController(Context, HistoricalDataProviders);
            var instantGPS = gpsController.Instant(includeSidechains);
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

        [HttpGet]
        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(string provider, int year, string network = "Mainnet", bool includeSidechains = true)
        {
            var data = Get(provider, "All", network, includeSidechains);
            foreach (var key in data.Keys)
            {
                data[key] = data[key].Where(x => x.Data.First().Date.Year == year);
            }
            return data;
        }

        [HttpGet]
        public IDictionary<string, DataPoint> Max(string provider, string network = "Mainnet")
        {
            Dictionary<string, DataPoint> gasAdjustedTPS = new(); 
            var gpsController = new GPSController(Context, HistoricalDataProviders);
            var maxGPS = gpsController.Max(provider, network);
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
