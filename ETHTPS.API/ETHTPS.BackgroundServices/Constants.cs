namespace ETHTPS.Services
{
    public static class CronConstants
    {
        public const string Every5s = "*/5 * * * * *";
        public const string Every10s = "*/10 * * * * *";
        public const string Every13s = "*/13 * * * * *";
        public const string Every30s = "*/30 * * * * *";
        public const string EveryMinute = "* * * * *";
        public const string Every5Minutes = "*/5 * * * *";
        public const string Every15Minutes = "*/15 * * * *";
        public const string EveryHour = "0 * * * *";
        public const string Never = "0 0 5 31 2 ?";
        public const string EveryMidnight = "0 0 * * *";
    }
}
