using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;
using ETHTPS.Data.Models.Query;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.PSServices
{
    public abstract class HistoricalMethodsServiceBase : ContextServiceBase
    {
        protected IEnumerable<IHistoricalDataProvider> HistoricalDataProviders { get; set; }
        protected HistoricalMethodsServiceBase(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context)
        {
            HistoricalDataProviders = historicalDataProviders;
        }

        protected IEnumerable<TimedTPSAndGasData> GetHistoricalData(ProviderQueryModel model, string interval)
        {
            if (HistoricalDataProviders.Any(x => x.Interval == interval))
            {
                var dataProvider = HistoricalDataProviders.First(x => x.Interval == interval);
                return dataProvider.GetData(model);
            }
            else
            {
                return new List<TimedTPSAndGasData>();
            }
        }
    }
}
