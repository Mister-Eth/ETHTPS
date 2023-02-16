using ETHTPS.Data.Integrations.MSSQL.TimeWarp.Models;
using ETHTPS.Data.Core.Models.Queries.Data.Requests;
using ETHTPS.Data.Core.Models.DataPoints;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.Integrations.MSSQL.TimeWarp
{
    public abstract class TimeWarpDataProviderBase<TTargetTimeWarpData> : ITimeWarpDataProvider
        where TTargetTimeWarpData : TimeWarpDataBase
    {
        private readonly EthtpsContext _context;
        private readonly Func<EthtpsContext, DbSet<TTargetTimeWarpData>> _dataSelector;

        protected TimeWarpDataProviderBase(EthtpsContext context, Func<EthtpsContext, DbSet<TTargetTimeWarpData>> dataSelector, string interval)
        {
            _context = context;
            _dataSelector = dataSelector;
            Interval = interval;
        }

        public string Interval { get; set; }

        public DateTime GetEarliestDate()
        {
            return _context.TimeWarpData.OrderBy(x => x.StartDate).FirstOrDefault().StartDate;
        }

        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public Task<TimeWarpSyncProgressModel> GetSyncProgress(ProviderQueryModel model)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetTPSAt(ProviderQueryModel model, long timestamp, string smoothing, int count)
        {
            throw new NotImplementedException();
        }
    }
}
