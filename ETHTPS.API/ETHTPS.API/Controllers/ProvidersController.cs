﻿using ETHTPS.API.Infrastructure.Services.Markdown;
using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Controllers
{
    [Route("api/management/providers")]
    [ApiController]
    public class ProvidersController : CRUDServiceControllerBase<Provider>
    {
        public ProvidersController(IProvidersService serviceImplementation) : base(serviceImplementation)
        {
        }
    }
}
