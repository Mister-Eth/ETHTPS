using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.API.Core.Integrations.MSSQL.Controllers.CRUD;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Models;

using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;

namespace ETHTPS.API.Controllers
{
    [Route("api/info/markdown-pages/")]
    [ApiController]
    public class MarkdownPagesController : CRUDServiceControllerBase<MarkdownPage>
    {
        private readonly IMarkdownService _markdownService;
        public MarkdownPagesController(IMarkdownService serviceImplementation) : base(serviceImplementation)
        {

            _markdownService = serviceImplementation;
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<MarkdownPage> GetMarkdownPagesFor(string providerName, [FromQuery] APIKeyRequestModel model) => _markdownService.GetMarkdownPagesFor(providerName);
    }
}
