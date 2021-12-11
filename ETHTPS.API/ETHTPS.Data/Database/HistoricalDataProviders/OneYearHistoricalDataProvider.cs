using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneYearHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataYear>
    {
        public OneYearHistoricalDataProvider(ETHTPSContext context) : base("OneYear", context, x => x.TpsandGasDataYears, TimeSpan.FromDays(365))
        {

        }
    }
}
