using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Core.Extensions
{
    public static class HttpContextExtensions
    {
        public static string ExtractAPIKey(this HttpContext context)
        {
            var apiKey = context.Request.Headers["X-API-KEY"];
            if (string.IsNullOrWhiteSpace(apiKey))
            {
                context.Request.Query.TryGetValue("XAPIKey", out apiKey);
            }
            return apiKey;
        }
    }
}
