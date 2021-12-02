using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Services.Implementations
{
    public class TimeWarpService : ITimeWarpService
    {
        public DateTime GetEarliestDate()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGasAdjustedTPSAt(long timestamp, string network, int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetGPSAt(long timestamp, string network, int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DataPoint> GetTPSAt(long timestamp, string network, int count)
        {
            throw new NotImplementedException();
        }
    }
}
