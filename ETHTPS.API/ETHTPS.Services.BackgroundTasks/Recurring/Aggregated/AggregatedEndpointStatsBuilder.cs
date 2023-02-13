using Coravel.Invocable;

using ETHTPS.Data.Integrations.MSSQL;

using Microsoft.Extensions.Logging;

namespace ETHTPS.Services.BackgroundTasks.Recurring.Aggregated
{
    public class AggregatedEndpointStatsBuilder : IInvocable, IInvocableWithPayload<IList<AggregatedEnpointStat>>
    {
        private readonly EthtpsContext _context;
        private readonly ILogger<AggregatedEndpointStatsBuilder> _logger;

        public AggregatedEndpointStatsBuilder(EthtpsContext context, ILogger<AggregatedEndpointStatsBuilder> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IList<AggregatedEnpointStat> Payload { get; set; }

        public Task Invoke()
        {
            _logger.LogTrace("Building aggregated stats...");
            var groups = Payload.GroupBy(x => x.Path);
            lock (_context.LockObj)
            {
                foreach (var group in groups)
                {
                    if (!_context.AggregatedEnpointStats.Any(x => x.Path == group.Key))
                    {
                        _context.AggregatedEnpointStats.Add(new AggregatedEnpointStat()
                        {
                            AverageRequestTimeMs = (int)group.Average(x => x.AverageRequestTimeMs),
                            Path = group.Key,
                            RequestCount = group.Count()
                        });
                    }
                    else
                    {
                        var g = _context.AggregatedEnpointStats.First(x => x.Path == group.Key);
                        g.AverageRequestTimeMs = (g.AverageRequestTimeMs * g.RequestCount + (int)group.Average(x => x.AverageRequestTimeMs) * group.Count()) / (g.RequestCount + group.Count());
                        g.RequestCount += group.Count();
                        _context.Update(g);
                    }
                }
                _context.SaveChanges();
            }
            Payload.Clear();
            _logger.LogTrace("Done");
            return Task.CompletedTask;
        }
    }
}
