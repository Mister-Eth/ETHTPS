using Newtonsoft.Json;

namespace ETHTPS.Services.Ethereum.Starkware.API.Models.TransactionCount
{
    public class TransactionCountRequestModel
    {
        [JsonProperty("day_start")]
        public int UnixDayStart { get; set; }

        [JsonProperty("day_end")]
        public int UnixDayEnd { get; set; }
        [JsonProperty("product")]
        public string Product { get; set; }
        [JsonProperty("tx_type")]
        public string TransactionType { get; set; }
        [JsonProperty("token_id")]
        public string TokenID { get; set; }
    }
}
