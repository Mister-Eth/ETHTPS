using ETHTPS.Data.Core;
using ETHTPS.Data.Models.Pages.Chart;

namespace ETHTPS.Data.Models.Pages.HomePage
{
    public class HomePageRequestModel : RequestModelWithChartBase
    {
        public string SubchainsOf { get; set; } = Constants.All;
    }
}
