using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.TimeWarp.Models
{
    public class TimeWarpSyncProgressModel
    {
        public int CurrentBlock { get; set; }

        public int LatestBlockHeight { get; set; }
    }
}
