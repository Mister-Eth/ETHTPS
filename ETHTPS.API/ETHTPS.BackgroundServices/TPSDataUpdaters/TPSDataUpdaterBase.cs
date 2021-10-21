using ETHTPS.Data.Database;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters
{
    public abstract class TPSDataUpdaterBase : ITPSDataUpdater, IHostedService, IDisposable
    {
        protected string Name { get; private set; }
        protected readonly IServiceScopeFactory _scopeFactory;
        protected readonly ILogger<TPSDataUpdaterBase> _logger;
        protected readonly TimeSpan _updateEvery;
        protected Timer _timer;

        protected TPSDataUpdaterBase(string name, IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger, TimeSpan updateEvery)
        {
            Name = name;
            _scopeFactory = scopeFactory;
            _logger = logger;
            _updateEvery = updateEvery;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(async o => {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<ETHTPSContext>();
                    var data = await LogDataAsync(context);
                    if (data != null)
                    {
                        await AddLatestEntryAsync(data, context);
                    }
                }
            },
              null,
              TimeSpan.Zero,
              _updateEvery);
            return Task.CompletedTask;
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

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public abstract Task<TPSData> LogDataAsync(ETHTPSContext context);
    }
}
