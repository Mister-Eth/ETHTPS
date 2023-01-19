﻿using ETHTPS.Data.Database;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public abstract class BackgroundTaskWithNotifier : HangfireBackgroundService
    {
        protected readonly DiscordWebhookNotifier _discordWebhookNotifier;

        public BackgroundTaskWithNotifier(ILogger<HangfireBackgroundService> logger, ETHTPSContext context, IConfiguration configuration) : base(logger, context)
        {
            _discordWebhookNotifier = new DiscordWebhookNotifier(configuration.GetSection("Discord").GetValue<string>("WebhookURL"));
        }
    }
}
