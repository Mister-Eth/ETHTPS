using System;

namespace ETHTPS.Services.Extensions
{
    public static class DateTimeExtensions
    {
        public static int GetTodayUnixDay() => GetUnixDay(DateTime.Now);

        public static int GetUnixDay(this DateTime date)
        {
            return date.ToUnixTimeSeconds() / 86400;
        }

        public static int ToUnixTimeSeconds(this DateTime date) => (int)date.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;
    }
}
