
using ETHTPS.API.BIL.Infrastructure.Services.APIKeys;
using ETHTPS.Data.ResponseModels.APIKey;

namespace ETHTPS.API.Security.Core.APIKeyProvider
{
    public interface IExtendedAPIKeyService : IAPIKeyService
    {
        Task<APIKeyResponseModel> RegisterNewKeyAsync(string humanityProof, string ipAddress);
        Task<APIKeyResponseModel> RegisterNewKeyForIPAddressAsync(string ipAddress);
    }
}
