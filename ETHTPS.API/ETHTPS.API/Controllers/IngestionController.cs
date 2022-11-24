using ETHTPS.Data;
using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Http;
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
        public IActionResult IngestLatestData()
        {
            if (!Request.Headers.ContainsKey(Constants.Headers.XAPIKey))
            {
                return Unauthorized($"No {Constants.Headers.XAPIKey} header specified");
            }
            var headerValues = Request.Headers[Constants.Headers.XAPIKey];
            if (headerValues.Count > 1)
            {
                return BadRequest($"Only one {Constants.Headers.XAPIKey} header allowed");
            }
            var keyHash = headerValues.First();
            if (!string.IsNullOrEmpty(keyHash))
            {
                if (!_context.APIKeys.Any(x => x.KeyHash.ToUpper() == keyHash.ToUpper()))
                    return Unauthorized();
            }
            else
            {
                return Unauthorized();
            }



            return Ok();
        }
    }
}
