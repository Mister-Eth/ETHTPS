﻿using System;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public class OneMonthHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataMonth>
    {
        public OneMonthHistoricalDataProvider(EthtpsContext context) : base("OneMonth", context, x => x.TpsandGasDataMonths, TimeSpan.FromDays(30))
        {

        }
    }
}
