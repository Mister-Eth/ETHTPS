using ETHTPS.API.BIL.Infrastructure.Services.APIKeys;
using ETHTPS.API.Security.Core.APIKeyProvider;
using ETHTPS.Data.ResponseModels.APIKey;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("/api/v3/APIKeys/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class APIKeyController : ControllerBase, IAPIKeyService
    {
        private readonly IExtendedAPIKeyService _apiKeyService;

        public APIKeyController(IExtendedAPIKeyService apiKeyService)
        {
            _apiKeyService = apiKeyService;
        }

        [HttpGet("GetNewKey")]
        public async Task<APIKeyResponseModel> RegisterNewKeyForProofAsync(string humanityProof)
        {
            return await _apiKeyService.RegisterNewKeyAsync(humanityProof, HttpContext.Request.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString());
        }
    }
}
