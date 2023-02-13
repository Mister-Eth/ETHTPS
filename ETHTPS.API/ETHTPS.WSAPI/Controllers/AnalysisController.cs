using Microsoft.AspNetCore.Mvc;

using System.Net.WebSockets;

namespace ETHTPS.WSAPI.Controllers
{
    [Route("api/ws/Analysis/[action]")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        [HttpGet]
        public string Test()
        {
            return "ok";
        }
    }
}
