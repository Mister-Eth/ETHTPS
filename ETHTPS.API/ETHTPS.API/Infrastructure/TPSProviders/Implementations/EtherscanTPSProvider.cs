using EtherscanApi.Net.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders.Implementations
{
    [Provider("Ethereum")]
    public class EtherscanTPSProvider : TPSProviderBase<IEtherScanClient>
    {
        public EtherscanTPSProvider(IEtherScanClient client) : base(client)
        {
        }

        public Task<double> GetTPSAsync(TimeInterval interval)
        {
            throw new NotImplementedException();
        }
    }
}
