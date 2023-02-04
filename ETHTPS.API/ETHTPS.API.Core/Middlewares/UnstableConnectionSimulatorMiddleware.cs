using Microsoft.AspNetCore.Http;

namespace ETHTPS.API.Core.Middlewares
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

        public async Task InvokeAsync(HttpContext context)
        {
            if (_random.Next(100) < 10)
            {
                await Task.Delay(_random.Next(7500));
                if (_random.Next(100) < 25) //Drop requests
                {
                    context.Abort();
                    return;
                }
            }
            await _next(context);
        }
    }
}
