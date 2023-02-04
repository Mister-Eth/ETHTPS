namespace ETHTPS.Configuration
{
    public static class Constants
    {
        public const string ENVIRONMENT =
#if DEBUG
            "Debug";
            #elif Staging
            "Staging";
#else
"Release";
#endif
    }
}
