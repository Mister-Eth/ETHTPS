using ETHTPS.API.Infrastructure.Database.Models;

using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
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
        private static bool IsLocalIpAddress(string host)
        {
            try
            {
                // get host IP addresses
                IPAddress[] hostIPs = Dns.GetHostAddresses(host);
                // get local IP addresses
                IPAddress[] localIPs = Dns.GetHostAddresses(Dns.GetHostName());

                // test if any host IP equals to any local IP or to localhost
                foreach (IPAddress hostIP in hostIPs)
                {
                    // is localhost
                    if (IPAddress.IsLoopback(hostIP)) return true;
                    // is local address
                    foreach (IPAddress localIP in localIPs)
                    {
                        if (hostIP.Equals(localIP)) return true;
                    }
                }
            }
            catch { }
            return false;
        }
        public async Task InvokeAsync(HttpContext context, ETHTPSContext dbContext)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            await _next(context);
            stopwatch.Stop();

            var isExternal = false;
            var key = "X-Forwarded-For";
            if (context.Request.Headers.ContainsKey(key))
            {
                var externalIPs = context.Request.Headers[key];
                foreach(var ip in externalIPs)
                {
                    if (!IsLocalIpAddress(ip))
                    {
                        if (!Dns.GetHostAddresses("ethtps.info").ToList().Select(x => x.MapToIPv4().ToString()).Contains(ip))
                        {
                            isExternal = true;
                            break;
                        }
                    }
                }
            }
            var entry = new AccesStat()
            {
                Count = 1,
                ExternalCount = 0,
                Path = context.Request.PathBase + context.Request.Path + context.Request.QueryString,
                Project = Assembly.GetEntryAssembly().FullName
            };
            if (!dbContext.AccesStats.Any(x=>x.Path == entry.Path && x.Project == entry.Project))
            {
                dbContext.AccesStats.Add(entry);
            }
            else
            {
                var target = dbContext.AccesStats.First(x => x.Path == entry.Path && x.Project == entry.Project);
                target.Count++;

                if (target.ExternalCount == null)
                {
                    target.ExternalCount = 0;
                }
                if (isExternal)
                {
                    target.ExternalCount++;
                }

                if (target.AverageRequestTimeMs is null)
                {
                    target.AverageRequestTimeMs = 0;
                }
                else
                {
                    target.AverageRequestTimeMs = (target.AverageRequestTimeMs * target.Count + stopwatch.Elapsed.TotalMilliseconds) / (target.Count + 1);
                }
                dbContext.AccesStats.Update(target);
            }
            dbContext.SaveChanges();
        }
    }
}
