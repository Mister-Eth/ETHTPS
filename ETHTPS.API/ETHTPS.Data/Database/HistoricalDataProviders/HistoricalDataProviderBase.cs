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

        protected HistoricalDataProviderBase(ETHTPSContext context, Func<ETHTPSContext, DbSet<TTargetHistoricalData>> dataSelector)
        {
            _context = context;
            _dataSelector = dataSelector;
        }

        public IEnumerable<TimedTPSAndGasData> GetData(string provider, string network) => _dataSelector(_context).Where(x => x.NetworkNavigation.Name == network && x.ProviderNavigation.Name == provider).OrderBy(x => x.StartDate);
    }
}
