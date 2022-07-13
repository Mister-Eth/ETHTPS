using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord.Endpoints
{
    public class GPSAPIStatusBackgroundTask : URLMonitoringBackgroundTask
    {
        public GPSAPIStatusBackgroundTask(ILogger<HangfireBackgroundService> logger, ETHTPSContext context, IConfiguration configuration) : base(logger, context, configuration, "https://api.ethtps.info/API/GPS/Get")
        {
        }
    }
}
