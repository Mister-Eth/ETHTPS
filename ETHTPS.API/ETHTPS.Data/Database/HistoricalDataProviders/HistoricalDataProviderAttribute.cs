using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class HistoricalDataProviderAttribute : Attribute
    {
        public string Interval { get; private set; }

        public HistoricalDataProviderAttribute(string interval)
        {
            Interval = interval;
        }
    }
}
