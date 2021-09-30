using ETHTPS.API.Infrastructure.Database.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ETHTPS.API.Middlewares
{
    public class RequestConsoleLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestConsoleLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ILogger<RequestConsoleLoggingMiddleware> logger)
        {
            logger.LogInformation($"{context.Connection.Id}: {context.Request.Path}{context.Request.QueryString}");
            await _next(context);
        }
    }
}
