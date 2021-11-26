using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Infrastructure.Serialization
{
    public static class SerializationExtensions
    {
        public static string SerializeAsJsonWithEmptyArray<T>(this T source)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ContractResolver = new NullToEmptyListResolver();
            settings.ObjectCreationHandling = ObjectCreationHandling.Replace;
            settings.Formatting = Formatting.Indented;
            return JsonConvert.SerializeObject(source, settings);
        }
    }
}
