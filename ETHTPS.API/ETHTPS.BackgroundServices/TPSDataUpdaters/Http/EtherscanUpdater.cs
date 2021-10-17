
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
    public class EtherscanUpdater : HTTPUpdaterBase
    {
        public EtherscanUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger, IConfiguration configuration) : base("Ethereum", scopeFactory, logger, configuration)
        {
        }
    }
}
