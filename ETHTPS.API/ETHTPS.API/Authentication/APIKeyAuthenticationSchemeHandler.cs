﻿using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Extensions;
using ETHTPS.Data.Extensions;

using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace ETHTPS.API.Authentication
{
    public class APIKeyAuthenticationSchemeHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly EthtpsContext _context;
        public APIKeyAuthenticationSchemeHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            EthtpsContext context) : base(options, logger, encoder, clock)
        {
            _context = context;
        }

        private bool ValidateAPIKey(StringValues apikey)
        {
            if (string.IsNullOrWhiteSpace(apikey)) return false;
            return _context.ValidateAPIKey(apikey);
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var apiKey = Context.ExtractAPIKey();
            if (!ValidateAPIKey(apiKey))
                return Task.FromResult(AuthenticateResult.Fail("No X-API-KEY header specified or API key is invalid"));

            if (!_context.ValidateNumberOfCalls(apiKey))
                return Task.FromResult(AuthenticateResult.Fail("Limit reached for today"));

            _context.IncrementNumberOfCalls(apiKey);
            Claim[] claims = new[] { new Claim(ClaimTypes.Name, "VALID USER") };
            ClaimsIdentity identity = new(claims, Scheme.Name);
            ClaimsPrincipal principal = new (identity);
            AuthenticationTicket ticket = new(principal, Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
