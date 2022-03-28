using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Extensions
{
    public static class DateTimeExtensions
    {
        public static int GetTodayUnixDay() => GetUnixDay(DateTime.Now);

        public static int GetUnixDay(DateTime date)
        {
            return date.ToUnixTimeSeconds() / 86400;
        }

        public static int ToUnixTimeSeconds(this DateTime date) => (int)date.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
    }
}
