using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Models.JSONRPC
{
    public class JSONRPCRequestModel
    {
        [JsonProperty("id")]
        public int ID { get; set; }

        [JsonProperty("jsonrpc")]
        public string JsonRPC { get; set; }

        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("params", DefaultValueHandling = DefaultValueHandling.Populate)]
        [DefaultValue("[]")]
        public List<object> Params { get; set; }
    }
}
