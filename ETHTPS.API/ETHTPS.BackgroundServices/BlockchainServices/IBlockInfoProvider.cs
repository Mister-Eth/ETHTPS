using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    /// <summary>
    /// Provides information about blocks.
    /// </summary>
    public interface IBlockInfoProvider : IInstantBlockInfoProvider, IHistoricalBlockInfoProvider
    {
        public double BlockTimeSeconds { get; set; }
    }
}
