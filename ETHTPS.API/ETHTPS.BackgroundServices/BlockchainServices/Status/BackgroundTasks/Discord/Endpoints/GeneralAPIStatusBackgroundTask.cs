using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord.Endpoints
{
    public class GeneralAPIStatusBackgroundTask : URLMonitoringBackgroundTask
    {
        public GeneralAPIStatusBackgroundTask(ILogger<HangfireBackgroundService> logger, ETHTPSContext context, IConfiguration configuration) : base(logger, context, configuration, "https://api.ethtps.info/API/v2/Intervals")
        {
        }
    }
}
