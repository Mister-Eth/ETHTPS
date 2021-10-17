using ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters;


using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.TPSDataUpdaters.Http
{
    public class OptimismUpdater : HTTPUpdaterBase
    {
        public OptimismUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger, IConfiguration configuration) : base("Optimism", scopeFactory, logger, configuration)
        {
        }
    }
}
