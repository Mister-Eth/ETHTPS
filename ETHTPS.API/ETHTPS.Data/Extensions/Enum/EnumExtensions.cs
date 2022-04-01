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
    }
}
