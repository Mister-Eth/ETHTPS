using ETHTPS.Data.Models.Pages.Chart;
using ETHTPS.Data.ResponseModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models.Pages.HomePage
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
