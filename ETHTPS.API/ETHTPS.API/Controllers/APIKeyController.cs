using ETHTPS.API.Infrastructure;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels.APIKey;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ETHTPS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class APIKeyController : ControllerBase
    {
        private readonly ETHTPSContext _context;
        private const int DEFAULT_REQUEST_LIMIT_24H = 5 * 5 * 3600 * 24; //Equivalent to 1 request per second; should be more than anyone needs
        private readonly ILogger<APIKeyController> _logger;

        public APIKeyController(ETHTPSContext context, ILogger<APIKeyController> logger)
        {
            _context = context;
            _logger = logger;
        }

        private bool Validate(string humanityProof)
        {
            return true;
        }

        [HttpGet("GetNewKey")]
        public IActionResult GetNewKey(string humanityProof)
        {
            if (!Validate(humanityProof))
            {
                return StatusCode(418, "Beep boop");
            }
            var actualKey = KeyGenerator.GetUniqueKey(64);
            var key = new Apikey()
            {
                KeyHash = actualKey.SHA256(),
                Limit24h = DEFAULT_REQUEST_LIMIT_24H,
                CallsLast24h = 0,
                TotalCalls = 0,
                RequesterIpaddress = HttpContext.Request.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString()
            };
            _context.Apikeys.Add(key);
            _context.SaveChanges();
            _logger.Log(LogLevel.Information, $"New API key created from {key.RequesterIpaddress}");
            return Created(string.Empty, new APIKeyResponseModel()
            {
                Key = actualKey,
                RequestLimit24h = key.Limit24h
            });
        }
    }
}
