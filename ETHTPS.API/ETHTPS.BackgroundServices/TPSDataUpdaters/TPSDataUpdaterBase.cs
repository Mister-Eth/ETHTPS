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
                    await LogDataAsync(context);
                }
            },
              null,
              TimeSpan.Zero,
              _updateEvery);
            return Task.CompletedTask;
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
        public void Dispose()
        {
            _timer?.Dispose();
        }

        public abstract Task LogDataAsync(ETHTPSContext context);
    }
}
