using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data
{
    public static class Constants
    {
        public static class CacheTimes
        {
            public static TimeSpan Realtime = TimeSpan.FromSeconds(3);
            public static TimeSpan LowUpdateRate = TimeSpan.FromMinutes(1);
        }

        public static string All => "All";
    }
}
