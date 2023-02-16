using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Controllers.CRUD;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models;
using ETHTPS.Data.Core.Models.ExternalWebsites;
using ETHTPS.Data.ResponseModels.SocialMedia;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("/api/v3/external-websites/[action]")]
    [ApiController]
    public class ExternalWebsitesController : CRUDServiceControllerBase<IExternalWebsite>
    {
        private readonly IExternalWebsitesService _externalWebsitesService;
        public ExternalWebsitesController(IExternalWebsitesService serviceImplementation) : base((ICRUDService<IExternalWebsite>)serviceImplementation)
        {
            _externalWebsitesService = serviceImplementation;
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<IProviderExternalWebsite> GetExternalWebsitesFor(string providerName, [FromQuery] APIKeyRequestModel model)
        {
            return _externalWebsitesService.GetExternalWebsitesFor(providerName);
        }
    }
}
