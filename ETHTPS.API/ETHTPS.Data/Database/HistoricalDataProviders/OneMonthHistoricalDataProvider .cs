using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneMonthHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataMonth>
    {
        public OneMonthHistoricalDataProvider(ETHTPSContext context) : base("OneMonth", context, x => x.TpsandGasDataMonths, TimeSpan.FromDays(30))
        {

        }
    }
}
