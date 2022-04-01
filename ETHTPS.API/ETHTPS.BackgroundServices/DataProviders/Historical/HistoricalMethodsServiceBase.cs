using ETHTPS.Data.Database;
using ETHTPS.Services.DataProviders.Historical;
using ETHTPS.Services.DataProviders.Historical.Chart;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical
{
    public abstract class HistoricalMethodsServiceBase<T> : ContextServiceBase
        where T: IHistoricalDataProvider
    {
        protected IEnumerable<T> HistoricalDataProviders { get; set; }
        protected HistoricalMethodsServiceBase(ETHTPSContext context, IEnumerable<T> historicalDataProviders) : base(context)
        {
            HistoricalDataProviders = historicalDataProviders;
        }

        protected IEnumerable<TimedTPSAndGasData> GetHistoricalData(string interval, string provider, string network)
        {
            if (HistoricalDataProviders.Any(x => x.Interval == interval))
            {
                var dataProvider = HistoricalDataProviders.First(x => x.Interval == interval);
                return dataProvider.GetData(provider, network);
            }
            else
            {
                return new List<TimedTPSAndGasData>();
            }
        }
    }
}
