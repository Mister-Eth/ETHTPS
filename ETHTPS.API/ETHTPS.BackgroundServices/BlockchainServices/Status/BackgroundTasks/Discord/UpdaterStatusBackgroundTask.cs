using ETHTPS.API.BIL.Infrastructure.Services.DataUpdater;
using ETHTPS.Data.Core.Extensions;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models.DataUpdater;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public class UpdaterStatusBackgroundTask : BackgroundTaskWithNotifier
    {
        private readonly IDataUpdaterStatusService _dataUpdaterStatusService;

        public UpdaterStatusBackgroundTask(ILogger<HangfireBackgroundService> logger, EthtpsContext context, IConfiguration configuration, IDataUpdaterStatusService dataUpdaterStatusService) : base(logger, context, configuration)
        {
            _dataUpdaterStatusService = dataUpdaterStatusService;
        }

        protected override string ServiceName => "UpdaterStatusBackgroundTask";

        public override async Task RunAsync()
        {
            var statuses = _dataUpdaterStatusService.GetAllStatuses().SafeWhere(x => x == UpdaterStatus.Failed);
            if (statuses?.Count() > 0)
            {
                var message = new WebhookMessage()
                {
                    content = "<@310483941268127744>\nSome services need attention or are down",
                    embeds = new Embed[]
                    {
                        new Embed()
                        {
                            color = 5814783,
                            title = "List",
                            description = string.Join("\n", statuses.Select(x=>string.Format($"{x.Updater}: Successful:Failed - {x.NumberOfSuccesses}:{x.NumberOfFailures}")))
                        }
                    }
                };
                await _discordWebhookNotifier.SendNotificationAsync(message);
            }
        }
    }
}
