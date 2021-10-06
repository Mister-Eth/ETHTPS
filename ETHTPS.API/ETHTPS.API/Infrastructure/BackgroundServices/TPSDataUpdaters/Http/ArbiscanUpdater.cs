﻿using ETHTPS.API.Infrastructure.Database.Models;

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
    public class ArbiscanUpdater : HTTPUpdaterBase
    {
        public ArbiscanUpdater(IServiceScopeFactory scopeFactory, ILogger<TPSLoggerBase> logger, IConfiguration configuration) : base("Arbitrum One", scopeFactory, logger, configuration)
        {
        }
    }
}
