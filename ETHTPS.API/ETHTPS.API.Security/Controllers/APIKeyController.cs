using ETHTPS.API.Core.Infrastructure;
using ETHTPS.API.Core.Infrastructure.Services.Recaptcha;
using ETHTPS.Data.Database;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels.APIKey;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;
using System;

namespace ETHTPS.API.Security.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class APIKeyController : ControllerBase
    {
        private readonly EthtpsContext _context;
        private const int DEFAULT_REQUEST_LIMIT_24H = 5 * 5 * 3600 * 24; //Equivalent to 1 request per second; should be more than anyone needs
        private readonly IRecaptchaVerificationService _recaptchaVerificationService;

        public APIKeyController(EthtpsContext context, IRecaptchaVerificationService recaptchaVerificationService)
        {
            _context = context;
            _recaptchaVerificationService = recaptchaVerificationService;
        }

        private async Task<bool> ValidateAsync(string humanityProof) => await _recaptchaVerificationService.VerifyRecaptchaAsync(humanityProof);
        private bool RecaptchaRequired()
        {
            lock (_context.LockObj)
            {
                //if (_context.)
            }
            return false;
        }

        [HttpGet("GetNewKey")]
        public async Task<APIKeyResponseModel> GetNewKey(string humanityProof)
        {
            if (!await ValidateAsync(humanityProof))
            {
                BadRequest("Beep boop");
            }
            var actualKey = KeyGenerator.GetUniqueKey(64);
            Apikey key = new()
            {
                KeyHash = actualKey.SHA256(),
                Limit24h = DEFAULT_REQUEST_LIMIT_24H,
                CallsLast24h = 0,
                TotalCalls = 0,
                RequesterIpaddress = HttpContext.Request.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString()
            };
            _context.Apikeys.Add(key);
            _context.SaveChanges();
            Console.WriteLine($"New API key created from {key.RequesterIpaddress}");
            return new APIKeyResponseModel()
            {
                Key = actualKey,
                RequestLimit24h = key.Limit24h
            };
        }
    }
}
