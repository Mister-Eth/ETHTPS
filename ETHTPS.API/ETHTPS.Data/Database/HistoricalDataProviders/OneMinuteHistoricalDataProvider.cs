﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneMinuteHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataMinute>
    {
        public OneMinuteHistoricalDataProvider(EthtpsContext context) : base("OneMinute", context, x => x.TpsandGasDataMinutes
        , TimeSpan.FromSeconds(60))
        {

        }
    }
}
