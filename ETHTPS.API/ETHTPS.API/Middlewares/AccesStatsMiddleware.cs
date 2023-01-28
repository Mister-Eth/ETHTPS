

using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ETHTPS.API.Middlewares
{
    public class AccesStatsMiddleware
    {
        private readonly RequestDelegate _next;

        public AccesStatsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ETHTPSContext dbContext, ILogger<AccesStatsMiddleware> logger, IConfiguration configuration)
        {
            Stopwatch stopwatch = new();
            stopwatch.Start();
            await _next(context);
            stopwatch.Stop();

            logger.LogInformation($"{context.Request.HttpContext.Connection.RemoteIpAddress} {context.Request.Headers["X-Forwarded-For"]} ({context.Connection.Id}): {context.Request.Path}{context.Request.QueryString} ({stopwatch.Elapsed.TotalMilliseconds}ms)");
        }
    }
}
