using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.API.DependencyInjection
{
    public static class ForwardExtensions
    {
        public static IApplicationBuilder RequestsAreForwardedByReverseProxy(this IApplicationBuilder app) => app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });
    }
}