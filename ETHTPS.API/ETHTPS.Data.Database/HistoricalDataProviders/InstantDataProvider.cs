using ETHTPS.Data.Models.Query;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders
{
    public class InstantDataProvider : IHistoricalDataProvider
    {
        private readonly EthtpsContext _context;

        public InstantDataProvider(EthtpsContext context)
        {
            _context = context;
        }

        public string Interval { get => "Instant"; }

        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model)
        {
            lock(_context.LockObj)
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
