using ETHTPS.Services.DataProviders.Historical.TimeWarp.Models;
using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public interface ITimeWarpService
    {
        public DateTime GetEarliestDate();
        public IEnumerable<DataPoint> GetTPSAt(long timestamp, string network, string smoothing, int count);
        public IEnumerable<DataPoint> GetGPSAt(long timestamp, string network, string smoothing, int count);
        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(long timestamp, string network, string smoothing, int count);
        public Task<TimeWarpSyncProgressModel> GetSyncProgress(string provider, string network);
    }
}
