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

namespace ETHTPS.BackgroundServices
{
    public abstract class BackgroundServiceBase : IHostedService, IDisposable
    {
        protected string Name { get; private set; }
        protected readonly TimeSpan _updateEvery;
        protected Timer _timer;
        protected readonly IServiceScopeFactory _scopeFactory;
        protected readonly ILogger<BackgroundServiceBase> _logger;

        protected BackgroundServiceBase(string name, IServiceScopeFactory scopeFactory, ILogger<BackgroundServiceBase> logger, TimeSpan updateEvery)
        {
            Name = name;
            _updateEvery = updateEvery;
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        public abstract Task RunAsync(ETHTPSContext context);

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(async o => {
                using (var scope = _scopeFactory.CreateScope())
                {
                    try
                    {
                        var context = scope.ServiceProvider.GetRequiredService<ETHTPSContext>();
                        var machine = context.GetOrInsertCurrentMachineConfiguration();
                        var stopwatch = new Stopwatch();
                        stopwatch.Start();

                        await RunAsync(context);

                        stopwatch.Stop();
                        Func<TaskPerformanceMetric, bool> filter = x => x.Machine == machine.Id && x.TaskName == Name;
                        if (!context.TaskPerformanceMetrics.Any(filter))
                        {
                            context.TaskPerformanceMetrics.Add(new TaskPerformanceMetric()
                            {
                                AverageRunTime = stopwatch.Elapsed.TotalMilliseconds,
                                Machine = machine.Id,
                                RunCount = 1,
                                TaskName = Name
                            });
                        }
                        else
                        {
                            var entry = context.TaskPerformanceMetrics.First(filter);
                            entry.AverageRunTime = (entry.AverageRunTime * entry.RunCount + stopwatch.Elapsed.TotalMilliseconds) / (++entry.RunCount);
                        }
                        await context.SaveChangesAsync();
                    }
                    catch (Exception e)
                    {
                        _logger.LogError(Name, e);
                    }
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

    }
}
