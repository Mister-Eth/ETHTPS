using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using ETHTPS.API.Infrastructure.Services;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.ResponseModels;

namespace ETHTPS.API.Infrastructure.Services.Implementations
{
    public class GPSService : HistoricalMethodsServiceBase, IPSService
    {
        public GPSService(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {
        }

        public IDictionary<string, DataPoint> Max(string provider, string network = "Mainnet")
        {
            var result = new List<DataResponseModel>();
            lock (Context.LockObj)
            {
                var providers = (provider.ToUpper() == "ALL") ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper()) };
                foreach (var p in providers.ToArray())
                {
                    var entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == network);
                    if (entry != null)
                    {
                        result.Add(new DataResponseModel()
                        {
                            Provider = p.Name,
                            Data = new List<DataPoint>()
                        {
                            new DataPoint()
                            {
                                Date = entry.Date,
                                Value = entry.MaxGps
                            }
                        }
                        });
                    }
                    else
                    {
                        //No max TPS data recorded yet, return 0
                        result.Add(new DataResponseModel()
                        {
                            Provider = p.Name,
                            Data = new List<DataPoint>()
                        {
                            new DataPoint()
                            {
                                Value = 0
                            }
                        }
                        });
                    }
                }
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.First());
        }

        public IDictionary<string, IEnumerable<DataPoint>> Instant(bool includeSidechains = true)
        {
            var result = new List<DataResponseModel>();
            lock (Context.LockObj)
            {
                foreach (var p in Context.Providers.ToList().Where(x => x.Enabled))
                {
                    if (!includeSidechains)
                    {
                        if (p.TypeNavigation.Name == "Sidechain")
                        {
                            continue;
                        }
                    }
                    if (Context.TpsandGasDataLatests.Any(x => x.Provider == p.Id))
                    {
                        var entry = Context.TpsandGasDataLatests.First(x => x.Provider == p.Id);
                        result.Add(new DataResponseModel()
                        {
                            Provider = p.Name,
                            Data = new List<DataPoint>() {{ new DataPoint() { Value = entry.Gps} }
                    }
                        });
                    }
                }
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
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

        public IDictionary<string, IEnumerable<DataResponseModel>> Get(string provider, string interval, string network = "Mainnet", bool includeSidechains = true)
        {
            var result = new Dictionary<string, IEnumerable<DataResponseModel>>();
            lock (Context.LockObj)
            {
                if (provider.ToUpper() == "ALL")
                {
                    foreach (var p in Context.Providers.ToList().Where(x => x.Enabled))
                    {
                        if (!includeSidechains)
                        {
                            if (IsSidechain(p.Name))
                            {
                                continue;
                            }
                        }
                        result[p.Name] = GetHistoricalData(interval, p.Name, network).Select(x => new DataResponseModel()
                        {
                            Data = new List<DataPoint>()
                        {
                            { new DataPoint(){Value = x.AverageGps, Date = x.StartDate} }
                        }
                        });
                    }
                }
                else
                {
                    result[provider] = GetHistoricalData(interval, provider, network).Select(x => new DataResponseModel()
                    {
                        Data = new List<DataPoint>()
                        {
                            { new DataPoint(){Value = x.AverageGps, Date = x.StartDate} }
                        }
                    });
                }
            }
            return result;
        }
    }
}
