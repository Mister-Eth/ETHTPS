using ETHTPS.Data.Models.Pages.Chart;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models.Pages.HomePage
{
    public class HomePageRequestModel : RequestModelWithChartBase
    {
        public string SubchainsOf { get; set; } = Data.Constants.All;
    }
}
