using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.Historical.Chart
{
    public interface IChartDataProvider
    {
        public IEnumerable<TimedTPSAndGasData> GetData(string provider, string network);
        public string Interval { get; }
    }
}
