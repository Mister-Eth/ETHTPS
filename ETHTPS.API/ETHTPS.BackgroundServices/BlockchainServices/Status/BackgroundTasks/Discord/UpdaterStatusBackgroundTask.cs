using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public class UpdaterStatusBackgroundTask : BackgroundTaskWithNotifier
    {
        private readonly IBlockInfoProviderStatusService _blockInfoProviderStatusService;

        public UpdaterStatusBackgroundTask(ILogger<HangfireBackgroundService> logger, ETHTPSContext context, IConfiguration configuration, IBlockInfoProviderStatusService blockInfoProviderStatusService) : base(logger, context, configuration)
        {
            _blockInfoProviderStatusService = blockInfoProviderStatusService;
        }

        public override async Task RunAsync()
        {
            var status = _blockInfoProviderStatusService.GetBlockInfoProviderStatus("All");
            var embeds = new List<Embed>();
            foreach(var key in status.Keys)
            {
                var x = status[key];
                if (x.Status == BlockInfoProviderStatus.NeedsAttention || x.Status == BlockInfoProviderStatus.Down)
                {
                    embeds.Add(new Embed()
                    {
                        color = 5814783,
                        title = key,
                        description = x.Status.ToString()
                    });
                }
            }
            if (embeds.Count > 0)
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
                            description = string.Join("\n", embeds.Select(x=>string.Format($"{x.title}: {x.description}")))
                        }
                    }
                };
                await _discordWebhookNotifier.SendNotificationAsync(message);
            }
        }
    }
}
