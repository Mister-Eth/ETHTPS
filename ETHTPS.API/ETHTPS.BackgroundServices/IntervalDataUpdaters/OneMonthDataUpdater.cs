

using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.IntervalDataUpdaters
{
    public class OneMonthDataUpdater : IntervalDataUpdaterBase
    {
        public OneMonthDataUpdater(ILogger<BackgroundServiceBase> logger, IServiceScopeFactory serviceScopeFactory) : base(logger, serviceScopeFactory, "OneMonth", TimeSpan.FromHours(1))
        {
        }

        public override Task<IEnumerable<TPSResponseModel>> RunAsync(ETHTPSContext context, int providerID, List<TPSResponseModel> currentCachedResponse)
        {
            currentCachedResponse = currentCachedResponse.OrderBy(x => x.Date).Where(x => x.Date > DateTime.Now.Subtract(TimeSpan.FromDays(30))).ToList(); //Filter out entries older than 1m
            var newestEntryDate = DateTime.Now.Subtract(TimeSpan.FromDays(30));
            if (currentCachedResponse.Count >= 1)
            {
                var last = currentCachedResponse.TakeLast(1).First();
                newestEntryDate = last.Date; //Get last entry date
            }

            var entries = context.Tpsdata.AsEnumerable().Where(x => x.Provider.Value == providerID && x.Date >= newestEntryDate).OrderBy(x => x.Date);
            var groups = entries.GroupBy(x => x.Date.Value.Day * 10000 + x.Date.Value.Month * 100 + x.Date.Value.Hour);
            var list = new List<TPSResponseModel>();
            foreach (var group in groups)
            {
                list.Add(new TPSResponseModel()
                {
                    Date = group.First().Date.Value.Subtract(TimeSpan.FromSeconds(group.First().Date.Value.Second)).Subtract(TimeSpan.FromMilliseconds(group.First().Date.Value.Millisecond)).Subtract(TimeSpan.FromMinutes(group.First().Date.Value.Minute)),
                    TPS = group.Average(x => x.Tps.Value)
                });
            }
            currentCachedResponse.AddRange(list);
            var result = currentCachedResponse.AsEnumerable();
            return Task.FromResult(result);
        }
    }
}
