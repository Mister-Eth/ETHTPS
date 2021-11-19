using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.HistoricalDataLoggers
{
    public abstract class HistoricalDataLoggerBase
    {
        protected readonly ETHTPSContext _context;
        protected readonly int _networkID;

        protected HistoricalDataLoggerBase(ETHTPSContext context, string network)
        {
            _context = context;
            _networkID = _context.Networks.First(x => x.Name == network).Id;
        }
    }
}
