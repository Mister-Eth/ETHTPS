using ETHTPS.Services.BlockchainServices;

namespace ETHTPS.Services
{
    /// <summary>
    /// Provides information about blocks.
    /// </summary>
    public interface IBlockInfoProvider : IInstantBlockInfoProvider, IHistoricalBlockInfoProvider
    {
        public double BlockTimeSeconds { get; set; }
    }
}
