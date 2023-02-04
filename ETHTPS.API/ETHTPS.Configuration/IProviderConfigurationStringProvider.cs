namespace ETHTPS.Configuration
{
    public interface IProviderConfigurationStringProvider
    {
        IEnumerable<IConfigurationString> GetConfigurationStringsForProvider(string provider);
        void SetConfigurationStringsForProvider(string provider, params IConfigurationString[] configStrings);
    }
}
