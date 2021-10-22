using ETHTPS.API.Infrastructure;
using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.IntervalDataUpdaters
{
    public abstract class IntervalDataUpdaterBase : BackgroundServiceBase
    {
        protected readonly string _interval;

        protected IntervalDataUpdaterBase(ILogger<BackgroundServiceBase> logger, IServiceScopeFactory serviceScopeFactory, string interval, TimeSpan updateEvery) : base($"IntervalDataUpdaterBase {interval}", serviceScopeFactory, logger, updateEvery)
        {
            _interval = interval;
        }

        public abstract Task<IEnumerable<TPSResponseModel>> RunAsync(ETHTPSContext context, int providerID, List<TPSResponseModel> currentCachedResponse);

        public override async Task RunAsync(ETHTPSContext context)
        {
            foreach (var provider in context.Providers.Select(x => x.Name).ToArray())
            {
                _logger.LogInformation($"Updating {provider}-{_interval}");

                var timeInterval = Enum.Parse<TimeInterval>(_interval);
                var name = StringExtensions.AggregateToLowercase(provider, _interval);
                if (timeInterval == TimeInterval.Instant)
                {
                    name = StringExtensions.AggregateToLowercase("Any", _interval);
                }
                IEnumerable<TPSResponseModel> result = new List<TPSResponseModel>() { };
                if (!context.CachedResponses.Any(x => x.Name == name))
                {
                    context.CachedResponses.Add(new CachedResponse()
                    {
                        Name = name,
                        Json = JsonConvert.SerializeObject(result)
                    });
                    context.SaveChanges();
                }
                var entry = context.CachedResponses.First(x => x.Name == name);
                var targetProvider = context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
                result = await RunAsync(context, targetProvider.Id, JsonConvert.DeserializeObject<List<TPSResponseModel>>(entry.Json));
                entry.Json = JsonConvert.SerializeObject(result);
                context.Update(entry);
                context.SaveChanges();

                if (timeInterval == TimeInterval.Instant)
                {
                    break;
                }
            }
        }
    }
}
