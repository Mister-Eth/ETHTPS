using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.PSServices.Implementations
{
    public class TPSService : HistoricalMethodsServiceBase, IPSService
    {
        public TPSService(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {

        }


        public IDictionary<string, DataPoint> Max(ProviderQueryModel model)
        {
            var result = new List<DataResponseModel>();
            lock (Context.LockObj)
            {
                var providers = (model.Provider.ToUpper() == "ALL") ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == model.Provider.ToUpper()) };
                foreach (var p in providers.ToArray())
                {
                    var entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == model.Network);
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
                                Value = entry.MaxTps,
                                BlockNumber = entry.MaxTPSBlockNumber
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

        public IDictionary<string, IEnumerable<DataResponseModel>> Get(ProviderQueryModel model, string interval)
        {
            var result = new Dictionary<string, IEnumerable<DataResponseModel>>();
            lock (Context.LockObj)
            {
                if (model.Provider.ToUpper() == "ALL")
                {
                    foreach (var p in Context.Providers.ToList().Where(x => x.Enabled))
                    {
                        if (!model.IncludeSidechains)
                        {
                            if (IsSidechain(p.Name))
                            {
                                continue;
                            }
                        }
                        result[p.Name] = GetHistoricalData(ProviderQueryModel.FromProviderName(p.Name), interval).Select(x => new DataResponseModel()
                        {
                            Data = new List<DataPoint>()
                        {
                            { new DataPoint(){Value = x.AverageTps, Date = x.StartDate} }
                        }
                        });
                    }
                }
                else
                {
                    result[model.Provider] = GetHistoricalData(model, interval).Select(x => new DataResponseModel()
                    {
                        Data = new List<DataPoint>()
                        {
                            { new DataPoint(){Value = x.AverageTps, Date = x.StartDate} }
                        }
                    });
                }
            }
            return result;
        }

        public IDictionary<string, IEnumerable<DataResponseModel>> GeMonthlyDataByYear(ProviderQueryModel model, int year)
        {
            var data = Get(model, Data.Constants.All);
            foreach (var key in data.Keys)
            {
                data[key] = data[key].Where(x => x.Data.First().Date.Year == year);
            }
            return data;
        }

        public IDictionary<string, IEnumerable<DataPoint>> Instant(ProviderQueryModel model)
        {
            var result = new List<DataResponseModel>();
            lock (Context.LockObj)
            {
                foreach (var p in Context.Providers.ToList().Where(x => x.Enabled))
                {
                    if (!model.IncludeSidechains)
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
                            Data = new List<DataPoint>()
                    {
                        { new DataPoint() { Value = entry.Tps} }
                    }
                        });
                    }
                }
            }
            return result.ToDictionary(x => x.Provider, x => x.Data.AsEnumerable());
        }

    }
}
