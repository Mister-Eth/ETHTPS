using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    [HistoricalDataProvider("OneMonth")]
    public class OneMonthHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataMonth>
    {
        public OneMonthHistoricalDataProvider(ETHTPSContext context) : base(context, x => x.TpsandGasDataMonths)
        {

        }
    }
}
