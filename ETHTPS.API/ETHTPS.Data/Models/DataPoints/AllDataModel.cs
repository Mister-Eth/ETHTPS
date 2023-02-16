using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.DataPoints
{
    public class AllDataModel
    {
        public IEnumerable<ProviderModel> Providers { get; set; }
        public IDictionary<string, object> MaxData { get; set; }
        public Dictionary<TimeInterval, IDictionary<string, IEnumerable<DataResponseModel>>> AllTPSData { get; set; }
        public Dictionary<TimeInterval, IDictionary<string, IEnumerable<DataResponseModel>>> AllGPSData { get; set; }
        public Dictionary<TimeInterval, IDictionary<string, IEnumerable<DataResponseModel>>> AllGasAdjustedTPSData { get; set; }
    }

    public class ProviderModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
