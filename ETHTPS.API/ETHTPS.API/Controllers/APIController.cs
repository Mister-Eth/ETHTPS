using ETHTPS.API.Infrastructure.Database.Models;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    [Route("API/[action]")]
    public class APIController : ControllerBase
    {
        private readonly ETHTPSContext _context;

        public APIController(ETHTPSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Provider> Providers()
        {
            return _context.Providers;
        }

        [HttpGet]
        public IEnumerable<ProviderType> ProviderTypes()
        {
            return _context.ProviderTypes;
        }
    }
}
