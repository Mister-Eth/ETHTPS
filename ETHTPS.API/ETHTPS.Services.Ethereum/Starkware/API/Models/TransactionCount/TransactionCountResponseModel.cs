using Newtonsoft.Json;

namespace ETHTPS.Services.Ethereum.Starkware.API.Models.TransactionCount
{
    public class TransactionCountResponseModel
    {
        [JsonProperty("count")]
        public int Count { get; set; }
    }

}
