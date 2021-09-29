using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.API.Models
{
    public class TPSResponseModel
    {
        public DateTime Date { get; set; }
        public double TPS { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Provider { get; set; }
    }
}
