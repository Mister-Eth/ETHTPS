using ETHTPS.Data.Integrations.MSSQL.TimeWarp.Models;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ETHTPS.Data.Integrations.MSSQL.TimeWarp
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
