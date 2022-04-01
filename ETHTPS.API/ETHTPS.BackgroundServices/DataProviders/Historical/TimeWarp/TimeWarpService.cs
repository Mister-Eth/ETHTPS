using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Services.DataProviders.Historical.Chart;
using ETHTPS.Services.DataProviders.Historical.TimeWarp;
using ETHTPS.Services.DataProviders.Historical.TimeWarp.Models;
using ETHTPS.Data.Extensions;
using ETHTPS.Data.ResponseModels;
using ETHTPS.Services;
using ETHTPS.Services.BlockchainServices.Extensions;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public class TimeWarpService : HistoricalMethodsServiceBase<ITimeWarpDataProvider>, ITimeWarpService
    {
        private readonly ETHTPSContext _context;
        private readonly IServiceProvider _services;
        private readonly IEnumerable<ITimeWarpDataProvider> _timeWarpDataProviders;

        public TimeWarpService(ETHTPSContext context, IServiceProvider services, IEnumerable<ITimeWarpDataProvider> timeWarpDataProviders) : base(context, timeWarpDataProviders)
        {
            _context = context;
            _services = services;
            _timeWarpDataProviders = timeWarpDataProviders;
        }

        public DateTime GetEarliestDate()
        {
            var oldest = _context.TimeWarpData.OrderByDescending(x => x.StartDate).FirstOrDefault();
            if (oldest != null)
            {
                return oldest.StartDate;
            }
            else return DateTime.MinValue;
        }

        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(long timestamp, string network, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGPSAt(long timestamp, string network, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public async Task<TimeWarpSyncProgressModel> GetSyncProgress(string provider, string network)
        {
            var blockInfoProvider = _services.GetProvider(provider);
            var earliestSyncedBlockHeight = 0;
            if (_context.TimeWarpData.Any(x => x.ProviderNavigation.Name == provider))
            {
                var entry = _context.TimeWarpData.Where(x => x.ProviderNavigation.Name == provider).OrderByDescending(x => x.Block).First().Block;
                if (entry.HasValue)
                {
                    earliestSyncedBlockHeight = entry.Value;
                }
            }
            return new TimeWarpSyncProgressModel()
            {
                CurrentBlock = earliestSyncedBlockHeight,
                LatestBlockHeight = (await blockInfoProvider.GetLatestBlockInfoAsync()).BlockNumber
            };
        }

        public IEnumerable<DataPoint> GetTPSAt(long timestamp, string network, string smoothing, int count)
        {
            var data = base.GetHistoricalData(smoothing, Constants.All, network);

            return data.Select(x=> new DataPoint()
            {
                Date = x.StartDate,
                Value = x.AverageTps
            });
        }
    }
}
