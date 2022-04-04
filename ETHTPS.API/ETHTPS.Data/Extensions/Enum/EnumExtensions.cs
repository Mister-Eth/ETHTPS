using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Extensions
{
    public static class EnumExtensions
    {
        public static TimeInterval ToTimeInterval(this string source)
        {
            var interval = TimeInterval.Instant;
            if (!string.IsNullOrWhiteSpace(source))
            {
                interval = Enum.Parse<TimeInterval>(source);
            }
            return interval;
        }

        public static TimeInterval NextInterval(this TimeInterval interval)
        {
            switch (interval)
            {
                case TimeInterval.OneMinute:
                    return TimeInterval.OneHour;
                case TimeInterval.OneHour:
                    return TimeInterval.OneDay;
                case TimeInterval.OneDay:
                    return TimeInterval.OneMonth;
                case TimeInterval.OneMonth:
                    return TimeInterval.OneYear;
                default:
                    return TimeInterval.OneDay;
            }
        }
    }
}
