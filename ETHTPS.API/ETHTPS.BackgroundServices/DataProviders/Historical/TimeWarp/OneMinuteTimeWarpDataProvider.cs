using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public class OneMinuteTimeWarpDataProvider : TimeWarpDataProviderBase<TimeWarpDataMinute>
    {
        public OneMinuteTimeWarpDataProvider(ETHTPSContext context) : base("OneMinute", context, x => x.TimeWarpDataMinutes, TimeSpan.FromMinutes(1))
        {
        }
    }
}
