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

        public abstract Task<TPSData> GetDataAsync();

        public override async Task RunAsync()
        {
            try
            {
                var data = await GetDataAsync();
                if (data != null)
                {
                    AddEntry(data);
                    RegisterLatestEntry(data);
                    UpdateMaxTPSEntry(data);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                _logger.LogError("TPSDataUpdaterBase", e);
            }
        }

        public void AddEntry(TPSData entry)
        {
            _context.TPSData.Add(entry);
            _context.SaveChanges();
            _logger.LogInformation($"{Name}: {entry.Tps}TPS");
        }

        public void RegisterLatestEntry(TPSData entry)
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
        }

        public void UpdateMaxTPSEntry(TPSData entry)
        {
            if (!_context.MaxTPSEntries.Any(x => x.Provider == entry.Provider))
            {
                _context.MaxTPSEntries.Add(new MaxTPSEntry()
                {
                    Entry = entry.Id,
                    Provider = entry.Provider
                });
            }
            else
            {
                var targetEntry = _context.MaxTPSEntries.First(x => x.Provider == entry.Provider);
                if (entry.Tps > _context.TPSData.First(x => x.Id == targetEntry.Entry).Tps)
                {
                    targetEntry.Entry = entry.Id;
                    _context.MaxTPSEntries.Update(targetEntry);
                }
            }
        }
    }
}
