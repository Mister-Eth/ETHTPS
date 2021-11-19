using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.ChartLoggers
{
    public class OneHourChartDataLogger : ChartDataLoggerBase<TpsandGasDataHour>
    {
        public OneHourChartDataLogger(ETHTPSContext context, string network = "Mainnet") : base(context, 
            dataSelector: x => x.TpsandGasDataHours,
            targetDateGenerator: x => x
                .Subtract(TimeSpan.FromSeconds(x.Second))
                .Subtract(TimeSpan.FromMilliseconds(x.Millisecond)),
            targetEntryPartialSelector: (a, b) => a.StartDate.Minute == b.Minute, 
            updateEntryIf: (a, b) => a.StartDate.Minute == b.Minute,
             network)
        {
        }
    }
}
