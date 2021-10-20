using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels
{
    public class TPSResponseModel
    {
        public DateTime Date { get; set; }
        public double TPS { get; set; }
        public string Color { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Provider { get; set; }
    }
}
