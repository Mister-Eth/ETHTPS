using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Models;

using Microsoft.AspNetCore.Mvc;

using System.Linq;

namespace ETHTPS.API.Controllers
{
    /// <summary>
    /// Used in prod ingesting data processed somewhere else. Saves prod work.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class IngestionController : ControllerBase
    {
        private readonly ETHTPSContext _context;

        public IngestionController(ETHTPSContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult IngestLatestData([FromQuery] APIKeyRequestModel model)
        {
            return Ok();
        }
    }
}
