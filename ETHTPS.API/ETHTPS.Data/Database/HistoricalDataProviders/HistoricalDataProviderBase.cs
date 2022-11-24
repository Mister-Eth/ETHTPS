using ETHTPS.Data.Models.Query;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public abstract class HistoricalDataProviderBase<TTargetHistoricalData> : IHistoricalDataProvider
        where TTargetHistoricalData: TimedTPSAndGasData
    {
        private readonly ETHTPSContext _context;
        private readonly Func<ETHTPSContext, DbSet<TTargetHistoricalData>> _dataSelector;
        private readonly TimeSpan _maxAge;

        protected HistoricalDataProviderBase(string interval, ETHTPSContext context, Func<ETHTPSContext, DbSet<TTargetHistoricalData>> dataSelector, TimeSpan maxAge)
        {
            Interval = interval;
            _context = context;
            _dataSelector = dataSelector;
            _maxAge = maxAge;
        }

        public string Interval { get; private set; }

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
