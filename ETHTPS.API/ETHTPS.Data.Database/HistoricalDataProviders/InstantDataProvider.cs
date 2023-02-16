using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public class InstantDataProvider : IHistoricalDataProvider
    {
        private readonly EthtpsContext _context;

        public InstantDataProvider(EthtpsContext context)
        {
            _context = context;
        }

        public TimeInterval Interval => TimeInterval.Instant;

        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model)
        {
            lock (_context.LockObj)
            {
                foreach (Provider p in _context.Providers.Where(x => x.Enabled).ToList())
                {
                    if (!model.IncludeSidechains)
                    {
                        if (p.TypeNavigation.Name == "Sidechain")
                        {
                            continue;
                        }
                    }
                    if (_context.TpsandGasDataLatests.Any(x => x.ProviderNavigation.Name == model.Provider))
                    {
                        TpsandGasDataLatest entry = _context.TpsandGasDataLatests.First(x => x.ProviderNavigation.Name == model.Provider);
                        yield return new()
                        {
                            AverageTps = entry.Tps,
                            AverageGps = entry.Gps,
                            Provider = entry.Provider,
                        };
                        break;
                    }
                }
            }
        }
    }
}
