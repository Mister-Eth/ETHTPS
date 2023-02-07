using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders;
using ETHTPS.Data.Models.Query;

using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.API.Core.Infrastructure.Services
{
    public abstract class HistoricalMethodsServiceBase : ContextServiceBase
    {
        protected IEnumerable<IHistoricalDataProvider> HistoricalDataProviders { get; set; }
        protected HistoricalMethodsServiceBase(EthtpsContext context, IEnumerable<IHistoricalDataProvider> historicalDataProviders) : base(context)
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
