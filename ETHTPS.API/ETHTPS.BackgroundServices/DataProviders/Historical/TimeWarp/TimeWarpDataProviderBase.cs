using ETHTPS.Services.DataProviders.Historical.TimeWarp.Models;
using ETHTPS.Data.ResponseModels;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ETHTPS.Data.Database;

namespace ETHTPS.Services.DataProviders.Historical.TimeWarp
{
    public abstract class TimeWarpDataProviderBase<TTargetTimeWarpData> : ITimeWarpDataProvider
        where TTargetTimeWarpData: TimeWarpDataBase
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

        public IEnumerable<TimedTPSAndGasData> GetData(string provider, string network)
        {
            throw new NotImplementedException();
        }

        public DateTime GetEarliestDate()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(long timestamp, string network, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGPSAt(long timestamp, string network, string smoothing, int count)
        {
            throw new NotImplementedException();
        }

        public Task<TimeWarpSyncProgressModel> GetSyncProgress(string provider, string network)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetTPSAt(long timestamp, string network, string smoothing, int count)
        {
            throw new NotImplementedException();
        }
    }
}
