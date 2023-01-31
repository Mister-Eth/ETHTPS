using ETHTPS.API.Infrastructure.Services;
using ETHTPS.API.Infrastructure.Services.ExternalWebsites;
using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels.SocialMedia;

using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Controllers
{
    [Route("api/info/external-websites/")]
    [ApiController]
    public class ExternalWebsitesController : CRUDServiceControllerBase<ExternalWebsite>
    {
        public ExternalWebsitesController(IExternalWebsitesService serviceImplementation) : base(serviceImplementation)
        {
        }
    }
}
