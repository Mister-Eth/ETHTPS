using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;

using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public interface IHistoricalDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model);
        public TimeInterval Interval { get; }
    }
}
