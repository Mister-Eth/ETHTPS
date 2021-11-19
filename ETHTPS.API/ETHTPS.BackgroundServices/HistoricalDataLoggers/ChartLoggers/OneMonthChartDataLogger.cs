using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers.ChartLoggers
{
    public class OneMonthChartDataLogger : ChartDataLoggerBase<TpsandGasDataMonth>
    {
        public OneMonthChartDataLogger(ETHTPSContext context, string network = "Mainnet") : base(context, 
            x => x.TpsandGasDataMonths,
            x => x
                .Subtract(TimeSpan.FromSeconds(x.Second))
                .Subtract(TimeSpan.FromMilliseconds(x.Millisecond))
                .Subtract(TimeSpan.FromMinutes(x.Minute))
                .Subtract(TimeSpan.FromHours(x.Hour)),
             targetEntryPartialSelector: (a, b) => a.StartDate.Day == b.Day,
             updateEntryIf: (a, b) => a.StartDate.Month == b.Month,
             network)
        {

        }
    }
}
