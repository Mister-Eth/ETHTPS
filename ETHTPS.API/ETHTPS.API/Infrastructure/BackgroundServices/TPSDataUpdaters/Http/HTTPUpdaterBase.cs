using ETHTPS.API.Infrastructure.BackgroundServices.IntervalDataUpdaters;
using ETHTPS.API.Infrastructure.Database.Models;

using Fizzler.Systems.HtmlAgilityPack;

using HtmlAgilityPack;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.BackgroundServices.TPSDataUpdaters.Http
{
    public abstract class HTTPUpdaterBase : TPSDataUpdaterBase
    {
        public string BaseURL { get; private set; }
        private readonly string _targetElementSelector;
        private readonly HttpClient _httpClient;

        protected HTTPUpdaterBase(string name, IServiceScopeFactory scopeFactory, ILogger<TPSDataUpdaterBase> logger, IConfiguration configuration) : base(name, scopeFactory, logger, TimeSpan.FromSeconds(5))
        {
            var config = configuration.GetSection("TPSLoggerConfigurations").GetSection("HTTPTPSLoggerConfiguration").GetSection(name);
            BaseURL = config.GetValue<string>("BaseURL");
            _targetElementSelector = config.GetValue<string>("TargetElement"); 
            _httpClient = new HttpClient();
        }

        public override async Task LogDataAsync(ETHTPSContext context)
        {
            try
            {
                HtmlWeb web = new HtmlWeb();
                HtmlDocument doc = web.Load(BaseURL);

                var nodes = doc.DocumentNode.QuerySelectorAll(_targetElementSelector);
                var x = new string(nodes.First().InnerText.Where(c => char.IsNumber(c) || c == '.').ToArray());
                var provider = context.Providers.First(x => x.Name == Name);
                var data = new TPSData()
                {
                    Date = DateTime.Now,
                    Provider = provider.Id,
                    Tps = float.Parse(x)
                };
                context.Tpsdata.Add(data);
                await context.SaveChangesAsync();
                _logger.LogInformation($"{Name}: {x}TPS");
            }
            catch (Exception e)
            {
                _logger.LogError($"{Name}: {e.Message}");
            }
        }
    }
}
