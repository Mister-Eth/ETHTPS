using EtherscanApi.Net.Interfaces;

using ETHTPS.API.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders.Implementations
{
    public class ArbiscanTPSProvider : TPSProviderBase<IEtherScanClient>
    {
        public ArbiscanTPSProvider(IEtherScanClient hTTPClient) : base(hTTPClient, "Arbitrum")
        {
        }

        public override async Task<IEnumerable<Models.TPSResponseModel>> GetTPSAsync(TimeInterval interval)
        {
            var result = new List<TPSResponseModel>();
            var random = new Random();
            for (int i = 0; i < 10; i++)
            {
                result.Add(new TPSResponseModel()
                {
                    Date = DateTime.Now.Subtract(TimeSpan.FromMinutes(10)).AddMinutes(1),
                    Provider = Name,
                    TPS = random.Next(10)
                });
            }
            return result;
        }
    }
}

