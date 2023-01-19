using ETHTPS.Data.Database.TimeWarp.Models;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.TimeWarp
{
    public interface ITimeWarpService
    {
        public DateTime GetEarliestDate();
        public IEnumerable<DataPoint> GetTPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count);
        public IEnumerable<DataPoint> GetGPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count);
        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count);
        public Task<TimeWarpSyncProgressModel> GetSyncProgress(ProviderQueryModel model);
    }
}
