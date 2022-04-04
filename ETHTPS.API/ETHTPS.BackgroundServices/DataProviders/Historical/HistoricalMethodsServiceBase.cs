using ETHTPS.Data.Database;
using ETHTPS.Services.DataProviders.Historical;
using ETHTPS.Services.DataProviders.Historical.Chart;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical
{
    public abstract class HistoricalMethodsServiceBase<T, V> : ContextServiceBase
        where T : IHistoricalDataProvider<V>
    {
        protected IEnumerable<T> HistoricalDataProviders { get; set; }
        protected HistoricalMethodsServiceBase(ETHTPSContext context, IEnumerable<T> historicalDataProviders) : base(context)
        {
            HistoricalDataProviders = historicalDataProviders;
        }

        protected IEnumerable<V> GetHistoricalData(string interval, string provider, string network)
        {
            return GetProvider(interval, provider).GetData(provider, network);
        }

        protected IEnumerable<V> GetHistoricalData(string interval, string provider, string network, DateTime olderThan)
        {
            return GetProvider(interval, provider).GetData(provider, network ,olderThan);
        }

        protected IEnumerable<V> GetHistoricalData(string interval, string provider, string network, DateTime olderThan, int count)
        {
            return GetProvider(interval, provider).GetData(provider, network, olderThan, count);
        }

        private T GetProvider(string interval, string provider)
        {
            return HistoricalDataProviders.First(x => x.Interval == interval);
        }
    }
}
