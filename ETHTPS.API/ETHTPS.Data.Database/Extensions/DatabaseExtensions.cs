using ETHTPS.Data.Core.Extensions.StringExtensions;

using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.Integrations.MSSQL.Extensions
{
    public static class DatabaseExtensions
    {
        public static async Task<T> GetCachedResponseAsync<T>(this EthtpsContext context, params object[] args)
        {
            var name = StringExtensions.AggregateToLowercase(args);

            if (await context.CachedResponses.AnyAsync(x => x.Name == name))
            {
                var json = (await context.CachedResponses.FirstAsync(x => x.Name == name)).KeyJson;
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
        public static int GetProviderID(this EthtpsContext context, string provider) => (context.Providers.First(x => x.Name.ToUpper() == provider.ToUpper())).Id;
        public static async Task<int> GetProviderIDAsync(this EthtpsContext context, string provider) => (await context.Providers.FirstAsync(x => x.Name.ToUpper() == provider.ToUpper())).Id;

        public static int GetMainnetID(this EthtpsContext context) => context.Networks.First(x => x.Name == "Mainnet").Id;

     
    }
}
