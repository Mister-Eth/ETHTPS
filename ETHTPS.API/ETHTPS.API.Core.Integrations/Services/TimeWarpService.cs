using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.TimeWarp;
using ETHTPS.Data.Integrations.MSSQL.TimeWarp.Models;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;
using ETHTPS.Services.BlockchainServices.Extensions;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class TimeWarpService : ITimeWarpService
    {
        private readonly EthtpsContext _context;
        private readonly IServiceProvider _services;

        public TimeWarpService(EthtpsContext context, IServiceProvider services)
        {
            _context = context;
            _services = services;
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

        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public async Task<TimeWarpSyncProgressModel> GetSyncProgress(ProviderQueryModel model)
        {
            var blockInfoProvider = _services.GetProvider(model.Provider);
            var earliestSyncedBlockHeight = 0;
            if (_context.TimeWarpData.Any(x => x.ProviderNavigation.Name == model.Provider))
            {
                var entry = _context.TimeWarpData.Where(x => x.ProviderNavigation.Name == model.Provider).OrderByDescending(x => x.Block).First().Block;
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

        public IEnumerable<DataPoint> GetTPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

    }
}
