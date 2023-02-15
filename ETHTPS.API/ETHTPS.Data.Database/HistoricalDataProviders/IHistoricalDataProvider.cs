using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders
{
    public interface IHistoricalDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model);
        public string Interval { get; }
    }
}
