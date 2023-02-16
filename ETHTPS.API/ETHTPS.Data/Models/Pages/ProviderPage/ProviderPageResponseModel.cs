using ETHTPS.Data.Core.Models.Pages.Chart;

using System.Collections.Generic;

namespace ETHTPS.Data.Core.Models.Pages.ProviderPage
{
    public class ProviderPageResponseModel : ResponseModelWithChartBase
    {
        public IEnumerable<TimeInterval> IntervalsWithData { get; set; }
        public IEnumerable<string> UniqueDataYears { get; set; }
    }
}
