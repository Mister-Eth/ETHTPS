using ETHTPS.Services.BlockchainServices;

namespace ETHTPS.API.BIL.Infrastructure.Services.BlockInfo
{
    /// <summary>
    /// Provides information about blocks.
    /// </summary>
    public interface IBlockInfoProvider : IInstantBlockInfoProvider, IHistoricalBlockInfoProvider
    {
        public double BlockTimeSeconds { get; set; }
    }
}
