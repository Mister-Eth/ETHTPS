using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    [HistoricalDataProvider("OneDay")]
    public class OneDayHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataDay>
    {
        public OneDayHistoricalDataProvider(ETHTPSContext context) : base(context, x => x.TpsandGasDataDays)
        {

        }
    }
}
