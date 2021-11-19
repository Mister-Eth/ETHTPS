using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.ChartLoggers
{
    public class OneDayChartLogger : ChartDataLoggerBase<TpsandGasDataDay>
    {
        public OneDayChartLogger(ETHTPSContext context, string network = "Mainnet") : base(context, 
            x => x.TpsandGasDataDays,
            x => x
                .Subtract(TimeSpan.FromSeconds(x.Second))
                .Subtract(TimeSpan.FromMilliseconds(x.Millisecond))
                .Subtract(TimeSpan.FromMinutes(x.Minute)),
             targetEntryPartialSelector: (a, b) => a.StartDate.Hour == b.Hour,
             updateEntryIf: (a, b) => a.StartDate.Day == b.Day,
             network)
        {

        }
    }
}
