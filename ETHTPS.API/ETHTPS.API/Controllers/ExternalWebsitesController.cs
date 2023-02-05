using ETHTPS.API.Core.Controllers.CRUD;
using ETHTPS.API.Core.Infrastructure.Services;
using ETHTPS.API.Core.Infrastructure.Services.ExternalWebsites;
using ETHTPS.Data.Database;
using ETHTPS.Data.Models;
using ETHTPS.Data.ResponseModels.SocialMedia;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("api/info/external-websites/")]
    [ApiController]
    public class ExternalWebsitesController : CRUDServiceControllerBase<ExternalWebsite>
    {
        private readonly IExternalWebsitesService _externalWebsitesService;
        public ExternalWebsitesController(IExternalWebsitesService serviceImplementation) : base(serviceImplementation)
        {
            _externalWebsitesService = serviceImplementation;
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<ProviderExternalWebsite> GetExternalWebsitesFor(string providerName, [FromQuery] APIKeyRequestModel model)
        {
            return _externalWebsitesService.GetExternalWebsitesFor(providerName);
        }
    }
}
