using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Status
{
    public interface IBlockInfoProviderStatusService
    {
        public IDictionary<string, BlockInfoProviderStatusResult> GetBlockInfoProviderStatus(string provider);
    }
}
