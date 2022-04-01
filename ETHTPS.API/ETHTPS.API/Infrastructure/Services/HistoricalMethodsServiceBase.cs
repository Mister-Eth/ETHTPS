using ETHTPS.Data.Database;
using ETHTPS.Data.Database.Historical.Chart;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services
{
    public abstract class HistoricalMethodsServiceBase : ContextServiceBase
    {
        protected IEnumerable<IChartDataProvider> ChartDataProviders { get; set; }
        protected HistoricalMethodsServiceBase(ETHTPSContext context, IEnumerable<IChartDataProvider> historicalDataProviders) : base(context)
        {
            ChartDataProviders = historicalDataProviders;
        }

        protected IEnumerable<TimedTPSAndGasData> GetChartData(string interval, string provider, string network)
        {
            if (ChartDataProviders.Any(x => x.Interval == interval))
            {
                var dataProvider = ChartDataProviders.First(x => x.Interval == interval);
                return dataProvider.GetData(provider, network);
            }
            else
            {
                return new List<TimedTPSAndGasData>();
            }
        }
    }
}
