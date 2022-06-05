using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.Ethereum.Starkware.API.Models.TransactionCount
{
    public class TransactionCountResponseModel
    {
        [JsonProperty("count")]
        public int Count { get; set; }
    }

}
