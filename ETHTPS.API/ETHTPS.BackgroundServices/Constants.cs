using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices
{
    public static class CronConstants
    {
        public const string Every5s = "*/5 * * * * *";
        public const string Every10s = "*/10 * * * * *";
        public const string EveryMinute = "* * * * *";
        public const string Every5Minutes = "*/5 * * * *";
        public const string EveryHour = "0 * * * *";
        public const string EveryMidnight = "0 0 * * *";
    }
}
