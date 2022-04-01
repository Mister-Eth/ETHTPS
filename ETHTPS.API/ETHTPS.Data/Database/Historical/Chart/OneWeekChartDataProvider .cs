﻿using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.Historical.Chart
{
    public class OneWeekChartDataProvider : ChartDataProviderBase<TpsandGasDataWeek>
    {
        public OneWeekChartDataProvider(ETHTPSContext context) : base("OneWeek", context, x => x.TpsandGasDataWeeks, TimeSpan.FromDays(7))
        {

        }
    }
}