using ETHTPS.Configuration;

using static ETHTPS.HangfireRunner.Constants;

namespace ETHTPS.HangfireRunner.Extensions
{
    public static class ConfigurationProviderExtensions
    {
        public static string GetFirstConfigurationStringForCurrentEnvironment(this IDBConfigurationProvider configurationProvider, string key) => configurationProvider.GetConfigurationStringsForMicroservice(CURRENT_APP_NAME).Where(x => x.Name.ToUpper() == key.ToUpper()).First().Value;
    }
}
