using ETHTPS.Data.Database.TimeWarp.Models;
using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.TimeWarp
{
    public interface ITimeWarpService
    {
        public DateTime GetEarliestDate();
        public IEnumerable<DataPoint> GetTPSAt(long timestamp, string network, int count);
        public IEnumerable<DataPoint> GetGPSAt(long timestamp, string network, int count);
        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(long timestamp, string network, int count);
        public Task<TimeWarpSyncProgressModel> GetSyncProgress(string provider, string network);
    }
}
