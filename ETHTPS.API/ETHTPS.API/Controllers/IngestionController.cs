using ETHTPS.Data;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models;

using Microsoft.AspNetCore.Mvc;

using System.Linq;

namespace ETHTPS.API.Controllers
{
    /// <summary>
    /// Used in prod ingesting data processed somewhere else. Saves prod work.
    /// </summary>
    [Route("/api/v3/Ingestion/[action]")]
    [ApiController]
    public class IngestionController : ControllerBase
    {
        private readonly EthtpsContext _context;

        public IngestionController(EthtpsContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult IngestLatestData()
        {
            return Ok();
        }
    }
}
