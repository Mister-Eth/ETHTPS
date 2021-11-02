using ETHTPS.Data.Database;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services
{
    public abstract class HangfireBackgroundService
    {
        public string Name { get; private set; }
        protected readonly ILogger<HangfireBackgroundService> _logger;
        protected readonly ETHTPSContext _context;

        protected HangfireBackgroundService(string name, ILogger<HangfireBackgroundService> logger, ETHTPSContext context)
        {
            Name = name;
            _logger = logger;
            _context = context;
        }

        public abstract Task RunAsync();
    }
}
