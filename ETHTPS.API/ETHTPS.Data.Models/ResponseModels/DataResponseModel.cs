﻿using Newtonsoft.Json;

namespace ETHTPS.Data.ResponseModels
{
    public class DataResponseModel
    {
        public List<DataPoint> Data { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Provider { get; set; }
    }
}
