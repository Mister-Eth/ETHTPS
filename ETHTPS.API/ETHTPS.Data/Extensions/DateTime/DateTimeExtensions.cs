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

        public static TimeInterval GetClosestInterval(this TimeSpan timeSpan)
        {
            if (timeSpan < TimeSpan.FromSeconds(60))
                return TimeInterval.Instant;
            if (timeSpan < TimeSpan.FromHours(1))
                return TimeInterval.OneMinute;
            if (timeSpan < TimeSpan.FromDays(7))
                return TimeInterval.OneHour;
            if (timeSpan < TimeSpan.FromDays(30))
                return TimeInterval.OneDay;
            if (timeSpan < TimeSpan.FromDays(365))
                return TimeInterval.OneHour;
            return TimeInterval.OneYear;
        }
    }
}
