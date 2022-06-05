using ETHTPS.Data.Models.Query;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public interface IHistoricalDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(ProviderQueryModel model);
        public string Interval { get; }
    }
}
