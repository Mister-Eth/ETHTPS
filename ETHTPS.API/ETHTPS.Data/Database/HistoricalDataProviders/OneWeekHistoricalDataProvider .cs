using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneWeekHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataWeek>
    {
        public OneWeekHistoricalDataProvider(ETHTPSContext context) : base("OneWeek", context, x => x.TpsandGasDataWeeks, TimeSpan.FromDays(7))
        {

        }
    }
}
