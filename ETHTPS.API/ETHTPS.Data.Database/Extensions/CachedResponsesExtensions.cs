using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;

namespace ETHTPS.Data.Integrations.MSSQL.Extensions
{
    public static class CachedResponsesExtensions
    {
        public static T? Get<T, TSet>(this DbSet<TSet> set, string name) where TSet : CachedResponse => set.Any(x => x.Name == name && x.ValueJson != null) ? JsonConvert.DeserializeObject<T>(set.FirstOrDefault(x => x.Name == name)?.ValueJson ?? "") : default;

    }
}
