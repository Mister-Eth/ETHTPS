using ETHTPS.Data.Database;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public class InstantTimeWarpDataProvider : TimeWarpDataProviderBase<TimeWarpDatum>
    {
        public InstantTimeWarpDataProvider(ETHTPSContext context) : base("Instant", context, x => x.TimeWarpData, TimeSpan.MaxValue)
        {
        }
    }
}
