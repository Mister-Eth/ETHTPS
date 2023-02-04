using ETHTPS.Configuration.Database;

namespace ETHTPS.Configuration
{
    public interface IDBConfigurationProvider : IEnvironmentConfiguration, IMicroserviceProvider, IMicroserviceConfigurationProvider, IEnvironmentProvider, IProviderConfigurationStringProvider
    {
        IDBConfigurationProvider this[string environment]
        {
            get;
        }
    }
}
