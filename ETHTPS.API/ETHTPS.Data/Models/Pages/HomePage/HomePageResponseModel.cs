using ETHTPS.Data.Core.Models.Pages.Chart;
using ETHTPS.Data.ResponseModels;

using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.Pages.HomePage
{
    public class HomePageResponseModel : ResponseModelWithChartBase
    {
        public IDictionary<string, object> MaxData { get; set; }
        public IDictionary<string, object> InstantData { get; set; }
        public IDictionary<string, string> ColorDictionary { get; set; }
        public IDictionary<string, string> ProviderTypesColorDictionary { get; set; }
        public IEnumerable<ProviderResponseModel> Providers { get; set; }
    }
}
