using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Query;

namespace ETHTPS.API.BIL.Infrastructure.Services.BlockInfo
{
    public interface IAsyncHistoricalBlockInfoProvider
    {
        Task<IEnumerable<IBlock>> GetLatestBlocksAsync(ProviderQueryModel model, TimeInterval period);
        Task<IEnumerable<IBlock>> GetBlocksBetweenAsync(ProviderQueryModel model, DateTime start, DateTime end);
    }
}
