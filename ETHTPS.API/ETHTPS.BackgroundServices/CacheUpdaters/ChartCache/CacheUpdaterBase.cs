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
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ETHTPS.Services.CacheUpdaters.ChartCache
{
    public abstract class CacheUpdaterBase<TCachedValue> : HangfireBackgroundService
        where TCachedValue: new()
    {
        protected readonly string _interval;

        protected CacheUpdaterBase(string interval, ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base($"IntervalDataUpdaterBase {interval}", logger, context)
        {
            _interval = interval;
        }

        public abstract Task<TCachedValue> RunAsync(ETHTPSContext context, Provider provider, TCachedValue currentCachedResponse);

        public override async Task RunAsync()
        {
            foreach (var provider in _context.Providers.ToArray())
            {
                _logger.LogInformation($"Updating {provider.Name}-{_interval}");
                var timeInterval = Enum.Parse<TimeInterval>(_interval);
                var name = StringExtensions.AggregateToLowercase(provider.Name, _interval);
                if (timeInterval == TimeInterval.Instant)
                {
                    name = StringExtensions.AggregateToLowercase("All", _interval);
                }
                if (!_context.CachedResponses.Any(x => x.Name == name))
                {
                    _context.CachedResponses.Add(new CachedResponse()
                    {
                        Name = name
                    });
                    _context.SaveChanges();
                }
                var entry = _context.CachedResponses.First(x => x.Name == name);
                var currentCachedResponse = new TCachedValue();
                try
                {
                    currentCachedResponse = JsonConvert.DeserializeObject<TCachedValue>(entry.Json);
                }
                catch { } //null values, type changes etc.
                var result = await RunAsync(_context, provider, currentCachedResponse);
                entry.Json = JsonConvert.SerializeObject(result);
                _context.Update(entry);
                _context.SaveChanges();

                _logger.LogInformation($"Updated {provider.Name}-{_interval}");
                if (timeInterval == TimeInterval.Instant)
                {
                    break;
                }
            }
        }
    }
}
