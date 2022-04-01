using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.Historical.Chart
{
    public class AllChartDataProvider : ChartDataProviderBase<TpsandGasDataAll>
    {
        public AllChartDataProvider(ETHTPSContext context) : base("All", context, x => x.TpsandGasDataAlls, TimeSpan.MaxValue)
        {

        }
    }
}
