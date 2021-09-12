using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders
{
    public abstract class TPSProviderBase<T>
    {
        protected TPSProviderBase(T hTTPClient)
        {
            Client = hTTPClient;
        }
        protected T Client { get; private set; }
    }
}
