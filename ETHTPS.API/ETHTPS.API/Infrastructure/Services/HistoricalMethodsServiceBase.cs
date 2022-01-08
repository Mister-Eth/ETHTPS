using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services
{
    public abstract class HistoricalMethodsServiceBase : ContextServiceBase
    {
        protected IEnumerable<IHistoricalDataProvider> HistoricalDataProviders { get; set; }
        protected HistoricalMethodsServiceBase(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context)
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
