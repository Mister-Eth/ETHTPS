using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.Historical.Chart
{
    public class OneDayChartDataProvider : ChartDataProviderBase<TpsandGasDataDay>
    {
        public OneDayChartDataProvider(ETHTPSContext context) : base("OneDay", context, x => x.TpsandGasDataDays, TimeSpan.FromDays(1))
        {

        }
    }
}
