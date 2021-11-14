using ETHTPS.Data.Database;
using ETHTPS.Data.Database.HistoricalDataProviders;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Controllers
{
    public abstract class APIControllerWithHistoricalMethodsBase : APIControllerBase
    {
        protected IEnumerable<IHistoricalDataProvider> HistoricalDataProviders { get; set; }
        protected APIControllerWithHistoricalMethodsBase(ETHTPSContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context)
        {
            HistoricalDataProviders = historicalDataProviders;
        }

        protected IEnumerable<TimedTPSAndGasData> GetHistoricalData(string interval, string provider, string network)
        {
            var dataProvider = HistoricalDataProviders.First(x => x.Interval == interval);
            return dataProvider.GetData(provider, network);
        }
    }
}
