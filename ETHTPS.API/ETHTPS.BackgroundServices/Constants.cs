﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Constants
{
    public static class CronConstants
    {
        public const string Every5s = "*/5 * * * * *";
        public const string Every10s = "*/10 * * * * *";
        public const string Every13s = "*/13 * * * * *";
        public const string EveryMinute = "* * * * *";
        public const string Every5Minutes = "*/5 * * * *";
        public const string Every15Minutes = "*/15 * * * *";
        public const string EveryHour = "0 * * * *";
        public const string Never = "0 0 5 31 2 ?";
        public const string EveryMidnight = "0 0 * * *";
    }

    public static class Queues
    {
        public const string TPSUPDATERQUEUE = "tpsdata";
        public const string CACHEUPDATERQUEUE = "cache";
        public const string STATUSUPDATERQUEUE = "status";
        public const string HISTORICALUPDATERQUEUE = "historical";
        public const string TIMEWARPUPDATERQUEUE = "timewarp";
    }
}
