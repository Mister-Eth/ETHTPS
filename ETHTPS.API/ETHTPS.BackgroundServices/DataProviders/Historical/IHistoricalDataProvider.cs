using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical
{
    public interface IHistoricalDataProvider<T>
    {
        public IEnumerable<T> GetData(string provider, string network);
        public IEnumerable<T> GetData(string provider, string network, DateTime olderThan);
        public IEnumerable<T> GetData(string provider, string network, DateTime olderThan, int count);
        public string Interval { get; }
    }
}
