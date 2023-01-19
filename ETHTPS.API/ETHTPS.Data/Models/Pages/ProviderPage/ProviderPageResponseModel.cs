using ETHTPS.Data.Models.Pages.Chart;

using System.Collections.Generic;

namespace ETHTPS.Data.Models.Pages.ProviderPage
{
    public class ProviderPageResponseModel : ResponseModelWithChartBase
    {
        public IEnumerable<string> IntervalsWithData { get; set; }
        public IEnumerable<string> UniqueDataYears { get; set; }
    }
}
