using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneWeekHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataWeek>
    {
        public OneWeekHistoricalDataProvider(ETHTPSContext context) : base("OneWeek", context, x => x.TpsandGasDataWeeks, TimeSpan.FromDays(7))
        {

        }
    }
}
