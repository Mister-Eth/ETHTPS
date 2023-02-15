using System.Collections.Generic;
using ETHTPS.Data.Models.ResponseModels.DataPoints;

namespace ETHTPS.Data.ResponseModels.HomePage
{
    public class HomePageViewModel
    {
        public IDictionary<string, IEnumerable<DataPoint>> InstantTPS { get; set; }
        public IEnumerable<ProviderInfo> ProviderData { get; set; }
        public Dictionary<string, string> ColorDictionary { get; set; }
        public Dictionary<string, Dictionary<string, IEnumerable<DataResponseModel>>> TPSData { get; set; }
    }
}
