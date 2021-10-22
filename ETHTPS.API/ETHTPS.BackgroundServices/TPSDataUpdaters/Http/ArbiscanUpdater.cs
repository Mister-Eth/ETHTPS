using ETHTPS.BackgroundServices.TPSDataUpdaters;


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
    public class ArbiscanUpdater : HTTPUpdaterBase
    {
        public ArbiscanUpdater(IServiceScopeFactory scopeFactory, ILogger<BackgroundServiceBase> logger, IConfiguration configuration) : base("Arbitrum One", scopeFactory, logger, configuration)
        {
        }
    }
}
