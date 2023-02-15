using Newtonsoft.Json;

using System;

namespace ETHTPS.Data.Core.Models.DataPoints
{
    /// <summary>
    /// Represents a TPS/GPS/GTPS data point
    /// </summary>
    public class DataPoint : IDataPoint
    {
        public DateTime Date { get; set; }
        public double Value { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int? BlockNumber { get; set; }
    }
}
