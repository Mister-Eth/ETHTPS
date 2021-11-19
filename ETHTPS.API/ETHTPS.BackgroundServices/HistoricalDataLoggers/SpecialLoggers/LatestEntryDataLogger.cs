using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.SpecialLoggers
{
    public class LatestEntryDataLogger : HistoricalDataLoggerBase, IHistoricalDataLogger
    {
        public LatestEntryDataLogger(ETHTPSContext context) : base(context, "Mainnet")
        {

        }

        public void AddOrUpdateEntry(TPSGPSInfo entry, int providerID)
        {
            Func<TpsandGasDataLatest, bool> selector = x => x.Network == _networkID && x.Provider == providerID;
            if (!_context.TpsandGasDataLatests.Any(selector))
            {
                _context.TpsandGasDataLatests.Add(new TpsandGasDataLatest()
                {
                    Gps = entry.GPS,
                    Tps = entry.TPS,
                    Network = 1,
                    Provider = providerID
                });
            }
            else
            {
                var x = _context.TpsandGasDataLatests.First(selector);
                x.Tps = entry.TPS;
                x.Gps = entry.GPS;
                _context.TpsandGasDataLatests.Update(x);
            }
        }
    }
}
