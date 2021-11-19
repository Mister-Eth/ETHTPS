using ETHTPS.Services.BlockchainServices;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers
{
    public interface IHistoricalDataLogger
    {
        public void AddOrUpdateEntry(TPSGPSInfo entry, int providerID);
    }
}
