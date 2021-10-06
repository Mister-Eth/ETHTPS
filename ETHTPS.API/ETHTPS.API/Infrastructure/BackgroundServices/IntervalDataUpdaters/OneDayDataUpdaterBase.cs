using ETHTPS.API.Infrastructure.Database.Models;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.BackgroundServices.IntervalDataUpdaters
{
    public class OneDayDataUpdaterBase : IntervalDataUpdaterBase
    {
        public OneDayDataUpdaterBase(ILogger<IntervalDataUpdaterBase> logger, IServiceScopeFactory serviceScopeFactory) : base(logger, serviceScopeFactory, "OneDay", TimeSpan.FromMinutes(60))
        {
        }
    }
}
