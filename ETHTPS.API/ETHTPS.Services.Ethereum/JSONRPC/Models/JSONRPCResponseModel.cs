using Newtonsoft.Json;

namespace ETHTPS.Services.Ethereum.JSONRPC.Models
{
    public class JSONRPCResponseModel
    {
        [JsonProperty("id")]
        public int ID { get; set; }

        [JsonProperty("jsonrpc")]
        public string JSONRPC { get; set; }

        [JsonProperty("result")]
        public string Result { get; set; }
    }
}
