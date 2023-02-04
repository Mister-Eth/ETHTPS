using ETHTPS.Data.Models.Query;

using System.Collections.Generic;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public interface IHistoricalDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model);
        public string Interval { get; }
    }
}
