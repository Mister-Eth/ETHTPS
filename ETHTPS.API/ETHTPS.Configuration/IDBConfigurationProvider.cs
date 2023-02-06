using ETHTPS.Configuration.Database;

namespace ETHTPS.Configuration
{
    public interface IDBConfigurationProvider : IEnvironmentConfiguration, IMicroserviceProvider, IMicroserviceConfigurationProvider, IEnvironmentProvider, IProviderConfigurationStringProvider, IConfigurationStringProvider, IDisposable
    {
        IDBConfigurationProvider this[string environment]
        {
            get;
        }
    }
}
