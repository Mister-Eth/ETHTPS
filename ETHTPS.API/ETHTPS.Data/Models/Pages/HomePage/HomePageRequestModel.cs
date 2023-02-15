using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.Pages.Chart;

namespace ETHTPS.Data.Core.Models.Pages.HomePage
{
    public class HomePageRequestModel : RequestModelWithChartBase
    {
        public string SubchainsOf { get; set; } = Constants.All;
    }
}
