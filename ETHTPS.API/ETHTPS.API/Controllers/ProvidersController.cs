using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Controllers.CRUD;
using ETHTPS.Data.Integrations.MSSQL;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Controllers
{
    [Route("api/v3/management/providers")]
    [ApiController]
    [Authorize(Policy = "AdminsOnly")]
    public class ProvidersController : CRUDServiceControllerBase<Provider>
    {
        public ProvidersController(IProvidersService serviceImplementation) : base((ICRUDService<Provider>)serviceImplementation)
        {
        }
    }
}
