using ETHTPS.Data.Extensions.StringExtensions;

using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.Extensions
{
    public static class DatabaseExtensions
    {
        public static async Task<T> GetCachedResponseAsync<T>(this ETHTPSContext context, params object[] args)
        {
            var name = StringExtensions.AggregateToLowercase(args);

            if (await context.CachedResponses.AnyAsync(x => x.Name == name))
            {
                var json = (await context.CachedResponses.FirstAsync(x => x.Name == name)).Json;
                if (string.IsNullOrWhiteSpace(json))
                {
                    return default(T);
                }
                else
                {
                    return JsonConvert.DeserializeObject<T>(json);
                }
            }
            else
            {
                return default(T);
            }
        }

        public static async Task<int> GetProviderIDAsync(this ETHTPSContext context, string provider) => (await context.Providers.FirstAsync(x => x.Name.ToUpper() == provider.ToUpper())).Id;
    }
}
