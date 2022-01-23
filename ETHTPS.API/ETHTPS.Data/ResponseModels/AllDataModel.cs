using ETHTPS.Data.Database;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.ResponseModels
{
    public class AllDataModel
    {
        public IEnumerable<ProviderModel> Providers { get; set; }
        public IDictionary<string, object> MaxData { get; set; }
        public Dictionary<string, IDictionary<string, IEnumerable<DataResponseModel>>> AllTPSData { get; set; }
        public Dictionary<string, IDictionary<string, IEnumerable<DataResponseModel>>> AllGPSData { get; set; }
        public Dictionary<string, IDictionary<string, IEnumerable<DataResponseModel>>> AllGasAdjustedTPSData { get; set; }
    }

    public class ProviderModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
