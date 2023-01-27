using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneHourHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataHour>
    {
        public OneHourHistoricalDataProvider(ETHTPSContext context) : base("OneHour", context, x => x.TpsandGasDataHours, TimeSpan.FromHours(1))
        {

        }
    }
}
