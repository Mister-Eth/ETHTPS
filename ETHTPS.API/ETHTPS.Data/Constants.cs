using System;

namespace ETHTPS.Data.Core
{
    public static class Constants
    {
        public static class CacheTimes
        {
            public static TimeSpan Realtime = TimeSpan.FromSeconds(3);
            public static TimeSpan LowUpdateRate = TimeSpan.FromMinutes(1);
        }

        public static class Headers
        {
            public static string XAPIKey => "X-API-Key";
        }

        public static class TimeConstants
        {
            public static TimeSpan OneMinute = TimeSpan.FromSeconds(60);
        }

        public static string All => "All";
        public static string Mainnet => "Mainnet";
    }
}
