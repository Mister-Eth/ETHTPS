using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Models.Pages.Chart
{
    public abstract class ResponseModelWithChartBase : IResponseModel
    {
        public ChartData ChartData { get; set; }
    }
}
