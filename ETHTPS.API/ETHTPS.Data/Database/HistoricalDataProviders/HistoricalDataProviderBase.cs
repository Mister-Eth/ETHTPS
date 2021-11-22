using ETHTPS.Data.Extensions;
using ETHTPS.Data.Models;

using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

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

        public IEnumerable<TimedTPSAndGasData> GetData(string provider, string network)
        {
            var minDate = DateTime.Now.ToUniversalTime().Subtract(_maxAge);
            return _dataSelector(_context).Where(x => x.NetworkNavigation.Name == network && x.ProviderNavigation.Name == provider && x.StartDate >= minDate).OrderBy(x => x.StartDate).DistinctBy(x => x.StartDate);
        }

        public IEnumerable<TPSGPSOCLH> GetOCLH(string provider, string network)
        {
            var minDate = DateTime.Now.Subtract(_maxAge);
            return _dataSelector(_context).Where(x => !string.IsNullOrWhiteSpace(x.OclhJson) && x.NetworkNavigation.Name == network && x.ProviderNavigation.Name == provider && x.StartDate >= minDate).OrderBy(x => x.StartDate).Select(x => JsonConvert.DeserializeObject<TPSGPSOCLH>(x.OclhJson));
        }
    }
}
