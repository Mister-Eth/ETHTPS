using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/GPS/[action]")]
    public class GPSController : APIControllerWithHistoricalMethodsBase
    {
        public GPSController(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {
        }

        [HttpGet]
        public IEnumerable<GPSResponseModel> Max(string provider, string network = "Mainnet")
        {
            var result = new List<GPSResponseModel>();
            var providers = (provider.ToUpper() == "ALL") ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
            foreach (var p in providers.ToArray())
            {
                var entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == network);
                if (entry != null)
                {
                    result.Add(new GPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<GPSDataPoint>()
                        {
                            new GPSDataPoint()
                            {
                                Date = entry.Date,
                                GPS = entry.MaxGps
                            }
                        }
                    });
                }
                else
                {
                    //No max TPS data recorded yet, return 0
                    result.Add(new GPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<GPSDataPoint>()
                        {
                            new GPSDataPoint()
                            {
                                GPS = 0
                            }
                        }
                    });
                }
            }
            return result;
        }


        [HttpGet]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IDictionary<string, IEnumerable<GPSDataPoint>> InstantAsync(bool includeSidechains = true)
        {
            var result = new List<GPSResponseModel>();
            foreach (var p in Context.Providers.ToList())
            {
                if (Context.TpsandGasDataLatests.Any(x => x.Provider == p.Id))
                {
                    var entry = Context.TpsandGasDataLatests.First(x => x.Provider == p.Id);
                    result.Add(new GPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<GPSDataPoint>() {{ new GPSDataPoint() { GPS = entry.Gps} }
                    }
                    });
                }
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
        }

        [HttpGet]
        public Task<IEnumerable<GPSResponseModel>> GetAsync(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var result = new List<GPSResponseModel>();
            if (provider.ToUpper() == "ALL")
            {
                foreach (var p in Context.Providers.ToList())
                {
                    if (!includeSidechains)
                    {
                        if (IsSidechain(p.Name))
                        {
                            continue;
                        }
                    }
                    result.AddRange(GetHistoricalData(interval, p.Name, network).Select(x => new GPSResponseModel()
                    {
                        Data = new List<GPSDataPoint>()
                        {
                            { new GPSDataPoint(){GPS = x.AverageGps, Date = x.StartDate} }
                        }
                    }));
                }
            }
            else
            {
                result.AddRange(GetHistoricalData(interval, provider, network).Select(x => new GPSResponseModel()
                {
                    Data = new List<GPSDataPoint>()
                        {
                            { new GPSDataPoint(){GPS = x.AverageGps, Date = x.StartDate} }
                        }
                }));
            }
            return Task.FromResult(result.AsEnumerable());
        }
    }
}
