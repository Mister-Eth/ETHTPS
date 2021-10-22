using ETHTPS.BackgroundServices.Infrastructure.Performance.Tasks.Extensions;
using ETHTPS.Data.Database;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters
{
    public abstract class TPSDataUpdaterBase : BackgroundServiceBase
    {
        public TPSDataUpdaterBase(string name, IServiceScopeFactory scopeFactory, ILogger<BackgroundServiceBase> logger, TimeSpan updateEvery) : base(name, scopeFactory, logger, updateEvery)
        {

        }
        public abstract Task<TPSData> LogDataAsync(ETHTPSContext context);

        public override async Task RunAsync(ETHTPSContext context)
        {
            var data = await LogDataAsync(context);
            if (data != null)
            {
                await AddLatestEntryAsync(data, context);
            }
        }

        public async Task AddLatestEntryAsync(TPSData entry, ETHTPSContext context)
        {
            if (!context.LatestEntries.Any(x => x.Provider == entry.Provider))
            {
                context.LatestEntries.Add(new LatestEntry()
                {
                    Entry = entry.Id,
                    Provider = entry.Provider
                });
            }
            else
            {
                var targetEntry = context.LatestEntries.First(x => x.Provider == entry.Provider);
                targetEntry.Entry = entry.Id;
                context.LatestEntries.Update(targetEntry);
            }
            await context.SaveChangesAsync();
        }
    }
}
