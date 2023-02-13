using ETHTPS.Data.Integrations.MSSQL;

using Hangfire;

using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.HangfireLogging
{
    public abstract class HangfireBackgroundService
    {
        protected readonly ILogger<HangfireBackgroundService> _logger;
        protected readonly EthtpsContext _context;
        protected abstract string ServiceName { get; }

        protected HangfireBackgroundService(ILogger<HangfireBackgroundService> logger, EthtpsContext context)
        {
            _logger = logger;
            _context = context;
        }

        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public abstract Task RunAsync();
    }
}
