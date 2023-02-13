using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using Hangfire;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public abstract class URLMonitoringBackgroundTask : BackgroundTaskWithNotifier
    {
        private readonly HttpClient _httpClient;
        private readonly string _url;
        protected override string ServiceName => "URLMonitoringTask";
        public URLMonitoringBackgroundTask(ILogger<HangfireBackgroundService> logger, EthtpsContext context, IConfiguration configuration, string url) : base(logger, context, configuration)
        {
            _httpClient = new HttpClient();
            _url = url;
        }

        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            WebhookMessage message;
            try
            {
                var response = await _httpClient.GetAsync(_url);
                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception();
                }
            }
            catch
            {
                message = new WebhookMessage()
                {
                    content = "<@310483941268127744>\nURL down",
                    embeds = new Embed[]
                    {
                        new Embed()
                        {
                            color = 5814783,
                            title = "URL",
                            description = _url
                        }
                    }
                };
                await _discordWebhookNotifier.SendNotificationAsync(message);
            }
        }
    }
}
