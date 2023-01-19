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
