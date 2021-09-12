using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.Providers.Implementations
{
    [Provider("Arbitrum One")]
    public class Arbiscan : ITPSProvider
    {
        public Task<double> GetTPSAsync(TimeInterval interval)
        {
            throw new NotImplementedException();
        }
    }
}
