namespace ETHTPS.Configuration.Database
{
    public interface IMicroserviceConfigurationProvider
    {
        IEnumerable<IConfigurationString> GetConfigurationStringsForMicroservice(IMicroservice microservice);
        IEnumerable<IConfigurationString> GetConfigurationStringsForMicroservice(string microserviceName);
        void SetConfigurationStringForMicroservice(IMicroservice microservice, IConfigurationString configString);
        int SetConfigurationString(IConfigurationString configString);
        void SetConfigurationStringForMicroservice(string microserviceName, IConfigurationString configString);
    }
}
