namespace ETHTPS.Configuration
{
    public interface IMicroserviceProvider
    {
        IEnumerable<IMicroservice> GetMicroservices();
        void AddMicroservice(string name, string? description);
        int GetMicroserviceID(string name, bool addIfItDoesntExist);
    }
}
