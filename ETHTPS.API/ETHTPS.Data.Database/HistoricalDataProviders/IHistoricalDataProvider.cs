using ETHTPS.Data.Models.Queries;

using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders
{
    public interface IHistoricalDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model);
        public string Interval { get; }
    }
}
