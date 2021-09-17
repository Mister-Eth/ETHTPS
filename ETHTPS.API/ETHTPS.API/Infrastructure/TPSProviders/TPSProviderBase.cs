using ETHTPS.API.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure.TPSProviders
{
    public abstract class TPSProviderBase<T> : ITPSProvider
    {
        protected TPSProviderBase(T hTTPClient, string name)
        {
            Client = hTTPClient;
            Name = name;
        }

        public string Name { get; private set; }
        protected T Client { get; private set; }

        public abstract Task<IEnumerable<TPSResponseModel>> GetTPSAsync(TimeInterval interval);
    }
}
