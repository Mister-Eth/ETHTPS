using ETHTPS.API.Controllers.CRUD;
using ETHTPS.API.Infrastructure.Services.Markdown;
using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Controllers
{
    [Route("api/info/markdown-pages/")]
    [ApiController]
    public class MarkdownPagesController : CRUDServiceControllerBase<Provider>
    {
        public MarkdownPagesController(IProvidersService serviceImplementation) : base(serviceImplementation)
        {
        }
    }
}
