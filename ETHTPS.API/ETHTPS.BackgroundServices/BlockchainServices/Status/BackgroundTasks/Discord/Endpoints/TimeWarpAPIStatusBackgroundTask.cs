using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord.Endpoints
{
    public class TimeWarpAPIStatusBackgroundTask : URLMonitoringBackgroundTask
    {
        public TimeWarpAPIStatusBackgroundTask(ILogger<HangfireBackgroundService> logger, ETHTPSContext context, IConfiguration configuration) : base(logger, context, configuration, "https://api.ethtps.info/API/TimeWarp/GetEarliestDate")
        {
        }
    }
}
