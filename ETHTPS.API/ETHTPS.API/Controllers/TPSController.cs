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
    [Route("API/TPS/[action]")]
    public class TPSController : APIControllerWithHistoricalMethodsBase, IPSController<TPSDataPoint, TPSResponseModel>
    {
        public TPSController(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {
        }

        [HttpGet]
        public IDictionary<string, TPSDataPoint> Max(string provider, string network = "Mainnet")
        {
            var result = new List<TPSResponseModel>();
            var providers = (provider.ToUpper() == "ALL") ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
            foreach (var p in providers.ToArray())
            {
                var entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == network);
                if (entry != null)
                {
                    result.Add(new TPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<TPSDataPoint>()
                        {
                            new TPSDataPoint()
                            {
                                Date = entry.Date,
                                TPS = entry.MaxTps
                            }
                        }
                    });
                }
                else
                {
                    //No max TPS data recorded yet, return 0
                    result.Add(new TPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<TPSDataPoint>()
                        {
                            new TPSDataPoint()
                            {
                                TPS = 0
                            }
                        }
                    });
                }
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.First());
        }



        [HttpGet]
        public IDictionary<string, IEnumerable<TPSResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var result = new Dictionary<string, IEnumerable<TPSResponseModel>>();
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
                    result[p.Name] = GetHistoricalData(interval, p.Name, network).Select(x => new TPSResponseModel()
                    {
                        Data = new List<TPSDataPoint>()
                        {
                            { new TPSDataPoint(){TPS = x.AverageTps, Date = x.StartDate} }
                        }
                    });
                }
            }
            else
            {
                result[provider] = GetHistoricalData(interval, provider, network).Select(x => new TPSResponseModel()
                {
                    Data = new List<TPSDataPoint>()
                        {
                            { new TPSDataPoint(){TPS = x.AverageTps, Date = x.StartDate} }
                        }
                });
            }
            return result;
        }

        [HttpGet]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IDictionary<string, IEnumerable<TPSDataPoint>> Instant(bool includeSidechains = true)
        {
            var result = new List<TPSResponseModel>();
            foreach (var p in Context.Providers.ToList())
            {
                if (Context.TpsandGasDataLatests.Any(x => x.Provider == p.Id))
                {
                    var entry = Context.TpsandGasDataLatests.First(x => x.Provider == p.Id);
                    result.Add(new TPSResponseModel()
                    {
                        Provider = p.Name,
                        Data = new List<TPSDataPoint>()
                    {
                        { new TPSDataPoint() { TPS = entry.Tps} }
                    }
                    });
                }
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
        }


    }
}
