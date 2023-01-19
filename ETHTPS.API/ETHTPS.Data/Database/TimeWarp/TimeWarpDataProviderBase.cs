using ETHTPS.Data.Database.TimeWarp.Models;
using ETHTPS.Data.Models.Query;
using ETHTPS.Data.ResponseModels;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.TimeWarp
{
    public abstract class TimeWarpDataProviderBase<TTargetTimeWarpData> : ITimeWarpDataProvider
        where TTargetTimeWarpData : TimeWarpDataBase
    {
        private readonly ETHTPSContext _context;
        private readonly Func<ETHTPSContext, DbSet<TTargetTimeWarpData>> _dataSelector;

        protected TimeWarpDataProviderBase(ETHTPSContext context, Func<ETHTPSContext, DbSet<TTargetTimeWarpData>> dataSelector, string interval)
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
