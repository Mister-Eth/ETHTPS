using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Infrastructure
{
    public class ResponseCacher<TKey, TOut>
    {
        private readonly Dictionary<TKey, CachedResponse<TOut>> _cachedResponses = new Dictionary<TKey, CachedResponse<TOut>>();
        private readonly int _cacheTimeSeconds;

        public ResponseCacher(int cacheTimeSeconds = 60)
        {
            _cacheTimeSeconds = cacheTimeSeconds;
        }

        public async Task<TOut> ExecuteOrGetCachedValueAsync(TKey keyValue, Task<TOut> cacheTask)
        {
            if (!_cachedResponses.ContainsKey(keyValue))
            {
                _cachedResponses[keyValue] = new CachedResponse<TOut>();
            }
            var entry = _cachedResponses[keyValue];
            if(DateTime.Now.Subtract(entry.LastCache).TotalSeconds >= _cacheTimeSeconds)
            {
                entry.Response = await cacheTask;
                entry.LastCache = DateTime.Now;
            }
            return entry.Response;
        }
    }

    public class CachedResponse<T>
    {
        public DateTime LastCache { get; set; } = DateTime.MinValue;
        public T Response { get; set; }
    }
}
