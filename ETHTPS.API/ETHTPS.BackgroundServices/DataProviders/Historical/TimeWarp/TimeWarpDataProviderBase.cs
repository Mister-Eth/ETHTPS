using ETHTPS.Data;
using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public abstract class TimeWarpDataProviderBase<TTargetHistoricalData> : ITimeWarpDataProvider
        where TTargetHistoricalData: TimeWarpDataBase
    {
        private readonly ETHTPSContext _context;
        private readonly Func<ETHTPSContext, DbSet<TTargetHistoricalData>> _dataSelector;
        private readonly TimeSpan _maxAge;

        protected TimeWarpDataProviderBase(string interval, ETHTPSContext context, Func<ETHTPSContext, DbSet<TTargetHistoricalData>> dataSelector, TimeSpan maxAge)
        {
            Interval = interval;
            _context = context;
            _dataSelector = dataSelector;
            _maxAge = maxAge;
        }

        public string Interval { get; private set; }

        public IEnumerable<TimeWarpDataBase> GetData(string provider, string network)
        {
            IEnumerable<TimeWarpDataBase> result;
            lock (_context.LockObj)
            {
                result = _dataSelector(_context).Where(x => x.NetworkNavigation.Name == network && x.ProviderNavigation.Name == provider).DistinctBy(x => x.StartDate).OrderBy(x => x.StartDate).ToList().Where(x => DateTime.Now.ToUniversalTime().Subtract(x.StartDate) <= _maxAge);
            }
            return result;
        }

        public IEnumerable<TimeWarpDataBase> GetData(string provider, string network, DateTime olderThan)
        {
            IEnumerable<TimeWarpDataBase> result;
            lock (_context.LockObj)
            {
                result = _dataSelector(_context).Where(x => x.NetworkNavigation.Name == network && ((provider == Constants.All) ? true : provider == x.ProviderNavigation.Name) && x.StartDate >= olderThan).DistinctBy(x => x.StartDate).OrderBy(x => x.StartDate).ToList().Where(x => DateTime.Now.ToUniversalTime().Subtract(x.StartDate) <= _maxAge);
            }
            return result;
        }

        public IEnumerable<TimeWarpDataBase> GetData(string provider, string network, DateTime olderThan, int count)
        {
            IEnumerable<TimeWarpDataBase> result;
            lock (_context.LockObj)
            {
                result = _dataSelector(_context).Where(x => x.NetworkNavigation.Name == network &&
                ((provider == Constants.All) ? true : provider == x.ProviderNavigation.Name) && x.StartDate >= olderThan).DistinctBy(x => x.StartDate).OrderBy(x => x.StartDate).Take(count).ToList().Where(x => DateTime.Now.ToUniversalTime().Subtract(x.StartDate) <= _maxAge);
            }
            return result;
        }
    }
}
