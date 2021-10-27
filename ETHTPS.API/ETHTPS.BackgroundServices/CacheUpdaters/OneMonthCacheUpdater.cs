

using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions;
using ETHTPS.Data.ResponseModels;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.CacheUpdaters
{
    public class OneMonthCacheUpdater : CacheUpdaterBase<TPSResponseModel>
    {
        public OneMonthCacheUpdater(ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base("OneMonth", logger, context)
        {
        }

        public override Task<TPSResponseModel> RunAsync(ETHTPSContext context, Provider provider, TPSResponseModel currentCachedResponse)
        {
            var newestEntryDate = DateTime.Now.Subtract(TimeSpan.FromDays(30));
            if (currentCachedResponse.Data?.Count >= 1)
            {
                currentCachedResponse.Data = currentCachedResponse.Data.OrderBy(x => x.Date).Where(x => x.Date > DateTime.Now.Subtract(TimeSpan.FromDays(30))).ToList(); //Filter out entries older than 1m
                var last = currentCachedResponse.Data.TakeLast(1).First();
                newestEntryDate = last.Date; //Get last entry date
            }
            else
            {
                currentCachedResponse.Data = new List<TPSDataPoint>();
            }

            var entries = context.TPSData.Where(x => x.Provider.Value == provider.Id && x.Date > newestEntryDate).AsEnumerable().OrderBy(x => x.Date);
            var groups = entries.GroupBy(x => x.Date.Value.Day * 100 + x.Date.Value.Month);
            var list = new List<TPSDataPoint>();
            foreach (var group in groups)
            {
                list.Add(new TPSDataPoint()
                {
                    Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)).Subtract(TimeSpan.FromHours(group.First().Date.Value.Hour)),
                    TPS = group.Average(x => x.Tps.Value)
                });
            }
            currentCachedResponse.Data.AddRange(list);
            var result = currentCachedResponse.Data.AsEnumerable();
            return Task.FromResult(new TPSResponseModel()
            {
                Provider = provider.Name,
                Data = result.DistinctBy(x => x.Date).ToList()
            });
        }
    }
}
