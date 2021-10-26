

using ETHTPS.Data;
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
    public class OneHourCacheUpdater : CacheUpdaterBase
    {
        public OneHourCacheUpdater(ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base("OneHour", logger, context)
        {
        }

        public override Task<IEnumerable<TPSResponseModel>> RunAsync(ETHTPSContext context, int providerID, List<TPSResponseModel> currentCachedResponse)
        {
            currentCachedResponse = currentCachedResponse.OrderBy(x => x.Date).Where(x => x.Date > DateTime.Now.Subtract(TimeSpan.FromHours(1))).ToList(); //Filter out entries older than 1h
            var newestEntryDate = DateTime.Now.Subtract(TimeSpan.FromHours(1));
            if (currentCachedResponse.Count >= 1)
            {
                var last = currentCachedResponse.TakeLast(1).First();
                newestEntryDate = last.Date; //Get last entry date
            }

            var newEntries = context.TPSData.AsEnumerable().Where(x => x.Provider.Value == providerID && x.Date > newestEntryDate).OrderBy(x => x.Date);
            var groups = newEntries.GroupBy(x => x.Date.Value.Minute);
            var list = new List<TPSResponseModel>();
            foreach (var group in groups)
            {
                list.Add(new TPSResponseModel()
                {
                    Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)),
                    TPS = group.Average(x => x.Tps.Value)
                });
            }
            currentCachedResponse.AddRange(list);
            var result = currentCachedResponse.AsEnumerable();
            return Task.FromResult(result.DistinctBy(x => x.Date));
        }
    }
}
