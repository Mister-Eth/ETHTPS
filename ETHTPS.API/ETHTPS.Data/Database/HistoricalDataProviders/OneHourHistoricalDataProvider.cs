using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    [HistoricalDataProvider("OneHour")]
    public class OneHourHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataHour>
    {
        public OneHourHistoricalDataProvider(ETHTPSContext context) : base(context, x => x.TpsandGasDataHours)
        {

        }
    }
}
