using System;

namespace ETHTPS.Data.Core.Extensions
{
    public static class DateTimeExtensions
    {
        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public static DateTime FromUnixTime(long unixTime)
        {
            return epoch.AddSeconds(unixTime);
        }

        public static long ToUnixTime(this DateTime time) => ((DateTimeOffset)time).ToUnixTimeSeconds();
    }
}
