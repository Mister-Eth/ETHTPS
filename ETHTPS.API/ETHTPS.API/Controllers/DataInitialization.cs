using ETHTPS.API.Core.Controllers;
using ETHTPS.Configuration.Database;
using ETHTPS.Data.Core.Models;

using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.API.Controllers
{
#if DEBUG
    [Route("api/v3/[controller]")]
    public class DataInitialization : APIControllerBase
    {
        private readonly PublicDataInitializer _publicDataInitializer;
        private readonly PrivateDataInitializer _privateDataInitializer;

        public DataInitialization(PublicDataInitializer publicDataInitializer, PrivateDataInitializer privateDataInitializer)
        {
            _publicDataInitializer = publicDataInitializer;
            _privateDataInitializer = privateDataInitializer;
        }

        [Route("[action]")]
        [HttpPut]
        public IActionResult Initialize()
        {
            _publicDataInitializer.Initialize();
            _privateDataInitializer.Initialize();
            return Created(string.Empty, null);
        }
    }
#endif
}
