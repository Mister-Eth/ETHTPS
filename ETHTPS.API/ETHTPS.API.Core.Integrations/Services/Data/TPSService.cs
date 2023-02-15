using ETHTPS.API.BIL.Infrastructure.Services.DataProviders;
using ETHTPS.API.Core.Services;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.Models.ResponseModels.DataPoints;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services.Data
{
    public class TPSService : HistoricalMethodsServiceBase, IPSService
    {
        public TPSService(EthtpsContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context, historicalDataProviders)
        {

        }


        public IDictionary<string, DataPoint> Max(ProviderQueryModel model)
        {
            List<DataResponseModel> result = new();
            lock (Context.LockObj)
            {
                IEnumerable<Provider> providers = model.Provider.ToUpper() == "ALL" ? Context.Providers.AsEnumerable() : new Provider[] { Context.Providers.First(x => x.Name.ToUpper() == model.Provider.ToUpper()) };
                foreach (Provider p in providers.ToArray())
                {
                    TpsandGasDataMax entry = Context.TpsandGasDataMaxes.FirstOrDefault(x => x.Provider == p.Id && x.NetworkNavigation.Name == model.Network);
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
                                BlockNumber = entry.MaxTpsblockNumber
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
            Dictionary<string, IEnumerable<DataResponseModel>> result = new();
            lock (Context.LockObj)
            {
                if (model.Provider.ToUpper() == "ALL")
                {
                    foreach (Provider p in Context.Providers.Where(x => x.Enabled).ToList())
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
                            { new DataPoint(){ Value = x.AverageTps, Date = x.StartDate} }
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
            IDictionary<string, IEnumerable<DataResponseModel>> data = Get(model, Constants.All);
            foreach (string key in data.Keys)
            {
                data[key] = data[key].Where(x => x.Data.First().Date.Year == year);
            }
            return data;
        }

        public IDictionary<string, IEnumerable<DataPoint>> Instant(ProviderQueryModel model)
        {
            List<DataResponseModel> result = new();
            lock (Context.LockObj)
            {
                foreach (Provider p in Context.Providers.Where(x => x.Enabled).ToList())
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
                        TpsandGasDataLatest entry = Context.TpsandGasDataLatests.First(x => x.Provider == p.Id);
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
