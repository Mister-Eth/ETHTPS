using ETHTPS.Data.Models.Query;

using System.Collections.Generic;

namespace ETHTPS.Services.BlockchainServices.Status
{
    public interface IBlockInfoProviderStatusService
    {
        public IDictionary<string, BlockInfoProviderStatusResult> GetBlockInfoProviderStatus(ProviderQueryModel model);
    }
}
