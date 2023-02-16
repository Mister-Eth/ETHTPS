using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ETHTPS.Data.Core.Models.DataUpdater
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UpdaterStatus { Failed, Running, RanSuccessfully, Idle, InTest }
    [JsonConverter(typeof(StringEnumConverter))]
    public enum UpdaterType { BlockInfo, TPSGPS, Historical }
}
