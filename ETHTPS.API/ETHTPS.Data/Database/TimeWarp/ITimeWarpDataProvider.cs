using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.TimeWarp
{
    public interface ITimeWarpDataProvider : ITimeWarpService
    {
        public string Interval { get; set; }
    }
}
