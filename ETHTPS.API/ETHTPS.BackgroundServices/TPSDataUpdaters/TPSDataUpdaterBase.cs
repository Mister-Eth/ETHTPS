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
    public abstract class TPSDataUpdaterBase : HangfireBackgroundService
    {
        protected TPSDataUpdaterBase(string name, ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base(name, logger, context)
        {
        }

        public abstract Task<TPSData> LogDataAsync();

        public override async Task RunAsync()
        {
            var data = await LogDataAsync();
            if (data != null)
            {
                await AddLatestEntryAsync(data);
            }
        }

        public async Task AddLatestEntryAsync(TPSData entry)
        {
            if (!_context.LatestEntries.Any(x => x.Provider == entry.Provider))
            {
                _context.LatestEntries.Add(new LatestEntry()
                {
                    Entry = entry.Id,
                    Provider = entry.Provider
                });
            }
            else
            {
                var targetEntry = _context.LatestEntries.First(x => x.Provider == entry.Provider);
                targetEntry.Entry = entry.Id;
                _context.LatestEntries.Update(targetEntry);
            }
            await _context.SaveChangesAsync();
        }
    }
}
