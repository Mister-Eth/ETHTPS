using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETHTPS.WSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngestionController : ControllerBase
    {
        [HttpPost]
        public async Task IngestLiveData([FromBody] Dictionary<string, object> data)
        {

        }
    }
}
