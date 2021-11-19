using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.SpecialLoggers
{
    public class MaxEntryDataLogger : HistoricalDataLoggerBase, IHistoricalDataLogger
    {
        public MaxEntryDataLogger(ETHTPSContext context) : base(context, "Mainnet")
        {

        }

        public void AddOrUpdateEntry(TPSGPSInfo entry, int providerID)
        {
            Func<TpsandGasDataMax, bool> selector = x => x.Provider == providerID && x.Network == _networkID;
            if (!_context.TpsandGasDataMaxes.Any(selector))
            {
                _context.TpsandGasDataMaxes.Add(new TpsandGasDataMax()
                {
                    Date = entry.Date,
                    MaxGps = entry.GPS,
                    MaxTps = entry.TPS,
                    Network = 1,
                    Provider = providerID
                });
            }
            else
            {
                var targetEntry = _context.TpsandGasDataMaxes.First(selector);
                if (entry.TPS > targetEntry.MaxTps)
                {
                    targetEntry.MaxTps = entry.TPS;
                }
                if (entry.GPS > targetEntry.MaxGps)
                {
                    targetEntry.MaxGps = entry.GPS;
                }
                _context.TpsandGasDataMaxes.Update(targetEntry);
            }
        }
    }
}
