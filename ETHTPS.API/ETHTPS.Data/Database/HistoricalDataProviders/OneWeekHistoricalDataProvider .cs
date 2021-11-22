using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneWeekHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataWeek>
    {
        public OneWeekHistoricalDataProvider(ETHTPSContext context) : base("OneWeek", context, x => x.TpsandGasDataWeeks, TimeSpan.FromDays(7))
        {

        }
    }
}
