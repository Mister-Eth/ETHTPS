using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class StarkwareTransactionCountData
    {
        public int Id { get; set; }
        public int Network { get; set; }
        public string Product { get; set; }
        public DateTime LastUpdateTime { get; set; }
        public int LastUpdateCount { get; set; }
        public double LastUpdateTPS { get; set; }

        public virtual Network NetworkNavigation { get; set; }
    }
}
