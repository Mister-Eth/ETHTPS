﻿
using ETHTPS.API.Infrastructure.Database.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters.Http
{
    public class EtherscanUpdater : HTTPUpdaterBase
    {
        public EtherscanUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger, IConfiguration configuration) : base("Ethereum", scopeFactory, logger, configuration)
        {
        }
    }
}
