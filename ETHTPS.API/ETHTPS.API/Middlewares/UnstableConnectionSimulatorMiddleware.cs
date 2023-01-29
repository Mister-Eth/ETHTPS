

using ETHTPS.Data.Database;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ETHTPS.API.Middlewares
{
    /// <summary>
    /// Testing how the frontend behaves when data loads slowly or doesn't even load at all
    /// </summary>
    public class UnstableConnectionSimulatorMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Random _random = new Random();
        public UnstableConnectionSimulatorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ETHTPSContext dbContext, ILogger<AccesStatsMiddleware> logger, IConfiguration configuration)
        {
            await Task.Delay(_random.Next(10000));
            if (_random.Next(100) < 25) //Drop requests
            {
                context.Abort();
                return;
            }
            await _next(context);
        }
    }
}
