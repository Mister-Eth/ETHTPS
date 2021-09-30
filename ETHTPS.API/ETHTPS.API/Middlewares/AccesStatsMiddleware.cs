using ETHTPS.API.Infrastructure.Database.Models;

using Microsoft.AspNetCore.Http;

using System;
using System.Collections.Generic;
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

        public async Task InvokeAsync(HttpContext context, ETHTPSContext dbContext)
        {
            var entry = new AccesStat()
            {
                Count = 1,
                Path = context.Request.PathBase + context.Request.Path + "?" + context.Request.QueryString,
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
                dbContext.AccesStats.Update(target);
            }
            dbContext.SaveChanges();
            await _next(context);
        }
    }
}
