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
    public interface IHistoricalBlockInfoProvider
    {
        /// <summary>
        ///  Gets information about a block asynchronously.
        /// </summary>
        /// <param name="blockNumber">The number of the block.</param>
        Task<BlockInfo> GetBlockInfoAsync(int blockNumber);

        /// <summary>
        /// Gets information about a block asynchronously.
        /// </summary>
        /// <param name="time">The time of the block.</param>
        /// <returns></returns>
        Task<BlockInfo> GetBlockInfoAsync(DateTime time);
    }
}
