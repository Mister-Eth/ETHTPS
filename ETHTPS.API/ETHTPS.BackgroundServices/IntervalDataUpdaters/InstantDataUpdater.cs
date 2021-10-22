

using ETHTPS.Data;
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
    public class InstantDataUpdater : IntervalDataUpdaterBase
    {
        public InstantDataUpdater(ILogger<BackgroundServiceBase> logger, IServiceScopeFactory serviceScopeFactory) : base(logger, serviceScopeFactory, "Instant", TimeSpan.FromSeconds(5))
        {
        }

        public override Task<IEnumerable<TPSResponseModel>> RunAsync(ETHTPSContext context, int providerID, List<TPSResponseModel> currentCachedResponse)
        {
            var latestEntryIDs = context.LatestEntries.Select(x => x.Entry).ToList();
            var entries = new List<TPSData>();
            foreach (var id in latestEntryIDs)
            {
                entries.Add(context.Tpsdata.First(x => x.Id == id));
            }
            var result = entries.Select(x => new TPSResponseModel()
            {
                Date = x.Date.Value,
                TPS = x.Tps.Value,
                Provider = context.Providers.First(y => y.Id == x.Provider).Name
            }).ToList().AsEnumerable();
            return Task.FromResult(result);
        }
    }
}
