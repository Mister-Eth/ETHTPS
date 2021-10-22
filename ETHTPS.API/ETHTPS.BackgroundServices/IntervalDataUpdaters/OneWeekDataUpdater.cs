

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.IntervalDataUpdaters
{
    public class OneWeekDataUpdater : IntervalDataUpdaterBase
    {
        public OneWeekDataUpdater(ILogger<BackgroundServiceBase> logger, IServiceScopeFactory serviceScopeFactory) : base(logger, serviceScopeFactory, "OneWeek", TimeSpan.FromMinutes(60))
        {
        }
    }
}
