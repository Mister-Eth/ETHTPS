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

namespace ETHTPS.BackgroundServices.IntervalDataUpdaters
{
    public abstract class IntervalDataUpdaterBase : HangfireBackgroundService
    {
        protected readonly string _interval;

        protected IntervalDataUpdaterBase(string interval, ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base($"IntervalDataUpdaterBase {interval}", logger, context)
        {
            _interval = interval;
        }

        public abstract Task<IEnumerable<TPSResponseModel>> RunAsync(ETHTPSContext _context, int providerID, List<TPSResponseModel> currentCachedResponse);

        public override async Task RunAsync()
        {
            foreach (var provider in _context.Providers.Select(x => x.Name).ToArray())
            {
                _logger.LogInformation($"Updating {provider}-{_interval}");
                var timeInterval = Enum.Parse<TimeInterval>(_interval);
                var name = StringExtensions.AggregateToLowercase(provider, _interval);
                if (timeInterval == TimeInterval.Instant)
                {
                    name = StringExtensions.AggregateToLowercase("Any", _interval);
                }
                IEnumerable<TPSResponseModel> result = new List<TPSResponseModel>() { };
                if (!_context.CachedResponses.Any(x => x.Name == name))
                {
                    _context.CachedResponses.Add(new CachedResponse()
                    {
                        Name = name,
                        Json = JsonConvert.SerializeObject(result)
                    });
                    _context.SaveChanges();
                }
                var entry = _context.CachedResponses.First(x => x.Name == name);
                var targetProvider = _context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper());
                result = await RunAsync(_context, targetProvider.Id, JsonConvert.DeserializeObject<List<TPSResponseModel>>(entry.Json));
                entry.Json = JsonConvert.SerializeObject(result);
                _context.Update(entry);
                _context.SaveChanges();

                _logger.LogInformation($"Updated {provider}-{_interval}");
                if (timeInterval == TimeInterval.Instant)
                {
                    break;
                }
            }
        }
    }
}
