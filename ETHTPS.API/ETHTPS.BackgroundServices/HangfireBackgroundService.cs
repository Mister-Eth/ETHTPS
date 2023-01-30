using ETHTPS.Data.Database;

using Microsoft.Extensions.Logging;

using System.Threading.Tasks;

namespace ETHTPS.Services
{
    public abstract class HangfireBackgroundService
    {
        protected readonly ILogger<HangfireBackgroundService> _logger;
        protected readonly EthtpsContext _context;

        protected HangfireBackgroundService(ILogger<HangfireBackgroundService> logger, EthtpsContext context)
        {
            _logger = logger;
            _context = context;
        }

        public abstract Task RunAsync();
    }
}
