

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.IntervalDataUpdaters
{
    public class OneDayDataUpdater : IntervalDataUpdaterBase
    {
        public OneDayDataUpdater(ILogger<BackgroundServiceBase> logger, IServiceScopeFactory serviceScopeFactory) : base(logger, serviceScopeFactory, "OneDay", TimeSpan.FromMinutes(60))
        {
        }
    }
}
