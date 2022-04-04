using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public class OneWeekTimeWarpDataProvider : TimeWarpDataProviderBase<TimeWarpDataWeek>
    {
        public OneWeekTimeWarpDataProvider(ETHTPSContext context) : base("OneHour", context, x => x.TimeWarpDataWeeks, TimeSpan.FromDays(7))
        {
        }
    }
}
