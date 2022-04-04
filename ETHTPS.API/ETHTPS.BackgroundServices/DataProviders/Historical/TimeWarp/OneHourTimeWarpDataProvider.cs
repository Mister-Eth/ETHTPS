using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public class OneHourTimeWarpDataProvider : TimeWarpDataProviderBase<TimeWarpDataHour>
    {
        public OneHourTimeWarpDataProvider(ETHTPSContext context) : base("OneHour", context, x => x.TimeWarpDataHours, TimeSpan.FromHours(1))
        {
        }
    }
}
