using ETHTPS.Data.Models.Pages.Chart;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models.Pages.ProviderPage
{
    public class ProviderPageResponseModel : ResponseModelWithChartBase
    {
        public IEnumerable<string> IntervalsWithData { get; set; }
        public IEnumerable<string> UniqueDataYears { get; set; }
    }
}
