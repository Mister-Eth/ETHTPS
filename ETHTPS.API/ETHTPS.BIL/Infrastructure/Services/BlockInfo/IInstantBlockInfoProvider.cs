using ETHTPS.Data.Core.Models.DataEntries;

using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    /// <summary>
    /// Provides information about blocks.
    /// </summary>
    public interface IInstantBlockInfoProvider
    {
        /// <summary>
        /// Gets information about the latest block asynchronously.
        /// </summary>
        /// <returns></returns>
        Task<Block> GetLatestBlockInfoAsync();
    }
}
