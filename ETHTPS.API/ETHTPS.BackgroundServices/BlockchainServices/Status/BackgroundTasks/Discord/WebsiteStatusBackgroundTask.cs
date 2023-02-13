using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public class WebsiteStatusBackgroundTask : URLMonitoringBackgroundTask
    {
        public WebsiteStatusBackgroundTask(ILogger<HangfireBackgroundService> logger, EthtpsContext context, IConfiguration configuration) : base(logger, context, configuration, "https://ethtps.info")
        {
        }
    }
}
