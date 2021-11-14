using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public interface IHistoricalDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(string provider, string network);
        public string Interval { get; }
    }
}
