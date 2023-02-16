using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ETHTPS.Services.BlockchainServices.Status
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum BlockInfoProviderStatus { Ok, Down, NeedsAttention, NotImplemented }
}
