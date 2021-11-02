using ETHTPS.Services.TPSDataUpdaters;
using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.TPSDataUpdaters.Http
{
    public class OptimismUpdater : HTTPUpdaterBase
    {
        public OptimismUpdater(ETHTPSContext context, ILogger<HangfireBackgroundService> logger, IConfiguration configuration) : base("Optimism", context, logger, configuration)
        {
        }
    }
}
