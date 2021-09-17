using EtherscanApi.Net.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders.Implementations
{
    public class EtherscanTPSProvider : TPSProviderBase<IEtherScanClient>
    {
        public EtherscanTPSProvider(IEtherScanClient client) : base(client, "Ethereum")
        {
        }

        public override Task<IEnumerable<Models.TPSResponseModel>> GetTPSAsync(TimeInterval interval)
        {
            throw new NotImplementedException();
        }
    }
}
