using EtherscanApi.Net.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders.Implementations
{
    [Provider("Arbitrum One")]
    public class ArbiscanTPSProvider : TPSProviderBase<IEtherScanClient>
    {
        public ArbiscanTPSProvider(IEtherScanClient hTTPClient) : base(hTTPClient)
        {
        }

        public Task<double> GetTPSAsync(TimeInterval interval)
        {
            throw new NotImplementedException();
        }
    }
}
