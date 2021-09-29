using ETHTPS.API.Infrastructure.Database.Models;
using ETHTPS.API.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETHTPS.Frontend.Models
{
    public interface ITPSChartModel
    {
        public IEnumerable<string> Providers { get; set; }
        public IEnumerable<string> Intervals { get; set; }
        public ChartDataModel ChartData { get; set; } 
    }
}
