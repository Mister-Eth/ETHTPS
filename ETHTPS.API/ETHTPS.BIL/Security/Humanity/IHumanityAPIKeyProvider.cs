using ETHTPS.API.Security.Core.APIKeyProvider;

namespace ETHTPS.API.Security.Core.Humanity
{
    public interface IHumanityAPIKeyProvider<THumanityCheckService> : IExtendedAPIKeyService
        where THumanityCheckService : IHumanityCheckService
    {
        THumanityCheckService HumanityService { get; }
    }
}
