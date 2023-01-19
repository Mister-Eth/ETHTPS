using Newtonsoft.Json;

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
