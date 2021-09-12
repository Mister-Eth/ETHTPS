using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Providers.Implementations
{
    [Provider("Ethereum")]
    public class Etherscan : ITPSProvider
    {
        public Task<double> GetTPSAsync(TimeInterval interval)
        {
            throw new NotImplementedException();
        }
    }
}
