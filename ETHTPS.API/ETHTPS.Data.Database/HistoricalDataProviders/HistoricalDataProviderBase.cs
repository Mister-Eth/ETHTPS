using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using Microsoft.EntityFrameworkCore;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public abstract class HistoricalTimedTPSAndGasDataProviderBase<TTargetHistoricalData> : IHistoricalDataProvider
        where TTargetHistoricalData : TimedTPSAndGasData
    {
        private readonly EthtpsContext _context;
        private readonly Func<EthtpsContext, DbSet<TTargetHistoricalData>> _dataSelector;
        private readonly TimeSpan _maxAge;

        protected HistoricalTimedTPSAndGasDataProviderBase(TimeInterval interval, EthtpsContext context, Func<EthtpsContext, DbSet<TTargetHistoricalData>> dataSelector, TimeSpan maxAge)
        {
            Interval = interval;
            _context = context;
            _dataSelector = dataSelector;
            _maxAge = maxAge;
        }

        public TimeInterval Interval { get; private set; }

        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model)
        {
            IEnumerable<TimedTPSAndGasData> result;
            lock (_context.LockObj)
            {
                result = _dataSelector(_context).ToList().Where(x => x.NetworkNavigation.Name == model.Network && x.ProviderNavigation.Name == model.Provider).DistinctBy(x => x.StartDate).OrderBy(x => x.StartDate).ToList().Where(x => DateTime.Now.ToUniversalTime().Subtract(x.StartDate) <= _maxAge);
            }
            return result;
        }
    }
}
