using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;

namespace ETHTPS.API.BIL.Infrastructure.Services.BlockInfo
{
    public interface IAsyncHistoricalBlockInfoProvider
    {
        IAsyncEnumerable<IBlock> GetLatestBlocksAsync(ProviderQueryModel model, TimeInterval period);
        IAsyncEnumerable<IBlock> GetBlocksBetweenAsync(ProviderQueryModel model, DateTime start, DateTime end);
    }
}
