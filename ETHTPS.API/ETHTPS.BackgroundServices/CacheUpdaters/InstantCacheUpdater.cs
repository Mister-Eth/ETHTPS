

using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.BackgroundServices.CacheUpdaters
{
    public class InstantCacheUpdater : CacheUpdaterBase<List<TPSResponseModel>>
    {
        public InstantCacheUpdater(ILogger<HangfireBackgroundService> logger, ETHTPSContext context) : base("Instant", logger, context)
        {
        }

        public override Task<List<TPSResponseModel>> RunAsync(ETHTPSContext context, Provider provider, List<TPSResponseModel> currentCachedResponse)
        {
            var latestEntryIDs = context.LatestEntries.Select(x => x.Entry).ToList();
            var entries = new List<Tpsdatum>();
            foreach (var id in latestEntryIDs)
            {
                entries.Add(context.Tpsdata.First(x => x.Id == id));
            }
            var result = entries.Select(x => new TPSResponseModel()
            {
                Provider = _context.Providers.First(y => y.Id == x.Provider).Name,
                Data = new List<TPSDataPoint>()
                {
                    new TPSDataPoint()
                    {
                        Date = x.Date.Value,
                        TPS = x.Tps.Value
                    }
                }
            }).ToList();
            return Task.FromResult(result);
        }
    }
}
