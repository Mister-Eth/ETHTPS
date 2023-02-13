using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Services.BlockchainServices.HangfireLogging;
using Hangfire;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status.BackgroundTasks.Discord
{
    public class PlausibleVisitorCountBackgroundTask : BackgroundTaskWithNotifier
    {
        private readonly HttpClient _httpClient;
        private readonly string _url;
        private readonly string _apiKey;

        public PlausibleVisitorCountBackgroundTask(ILogger<HangfireBackgroundService> logger, EthtpsContext context, IConfiguration configuration) : base(logger, context, configuration)
        {
            var config = configuration.GetSection("Plausible");
            _url = config.GetValue<string>("URL");
            _apiKey = config.GetValue<string>("APIKey");
            _httpClient = new HttpClient();
        }

        protected override string ServiceName => "PlausibleVisitorCountBackgroundTask";

        [AutomaticRetry(Attempts = 1, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
        public override async Task RunAsync()
        {
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);
            var response = await _httpClient.GetAsync(new Uri($"{_url}/api/v1/stats/aggregate?site_id=ethtps.info&period=day&metrics=visitors,pageviews&date={DateTime.Now.Year}-{DateTime.Now.Month}-{DateTime.Now.Subtract(TimeSpan.FromDays(1)).Day}", UriKind.Absolute));
            if (response.IsSuccessStatusCode)
            {
                var obj = JsonConvert.DeserializeObject<MetricsResponseModel>(await response.Content.ReadAsStringAsync());
                await _discordWebhookNotifier.SendNotificationAsync(new WebhookMessage()
                {
                    content = $"24h visitor stats",
                    embeds = new Embed[]
                    {
                        new Embed()
                        {
                            color = 5814783,
                            title = "Unique visitors",
                            description = obj.results.visitors.value.ToString()
                        },
                         new Embed()
                        {
                            color = 5814783,
                            title = "Pageviews",
                            description = obj.results.pageviews.value.ToString()
                        }
                    }
                });
            }
        }


        public class MetricsResponseModel
        {
            public Results results { get; set; }
        }

        public class Results
        {
            public Pageviews pageviews { get; set; }
            public Visitors visitors { get; set; }
        }

        public class Pageviews
        {
            public int value { get; set; }
        }

        public class Visitors
        {
            public int value { get; set; }
        }

    }
}
