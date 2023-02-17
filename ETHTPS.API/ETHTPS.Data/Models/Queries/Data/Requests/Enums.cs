using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ReturnCollectionType
    {
        Array, Dictionary
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum DatasetMergeMethod
    {
        MaxCount, SummingPercentage, NoMerge
    }
}
