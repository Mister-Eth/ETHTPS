using ETHTPS.Data.Integrations.MSSQL;

using Hangfire;

using Microsoft.Extensions.Logging;

namespace ETHTPS.Services.BackgroundTasks.Recurring.Database
{
    public class LiveDataUpdaterStatusesDuplicateRemoveTask : HangfireBackgroundService
    {
        public LiveDataUpdaterStatusesDuplicateRemoveTask(ILogger<HangfireBackgroundService> logger, EthtpsContext context) : base(logger, context)
        {
        }

        [AutomaticRetry(Attempts = 3, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override Task RunAsync()
        {
            _logger.LogTrace("Removing duplicate entries...");
            lock (_context.LockObj)
            {
                foreach(var group in _context.LiveDataUpdaterStatuses.GroupBy(x=>x.UpdaterId).ToList().Where(g=>g.Count() > 1))
                {
                    _logger.LogTrace($"Removing group of length {group.Count()} with ID {group.First().UpdaterId}...");
                    var newEntry = new LiveDataUpdaterStatus()
                    {
                        UpdaterId = group.Key,
                        NumberOfSuccesses = group.Sum(x=>x.NumberOfSuccesses),
                        NumberOfFailures = group.Sum(x=>x.NumberOfFailures),
                        LastSuccessfulRunTime = group.Select(x=>x.LastSuccessfulRunTime)?.Max(),
                        StatusId = group.First().StatusId
                    };
                    _context.LiveDataUpdaterStatuses.Add(newEntry);
                    _context.LiveDataUpdaterStatuses.RemoveRange(group);
                    _context.SaveChanges();
                }
            }
            return Task.CompletedTask;
        }
    }
}
