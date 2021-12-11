using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Models.JSONRPC
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
