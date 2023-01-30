using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneWeekHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataWeek>
    {
        public OneWeekHistoricalDataProvider(EthtpsContext context) : base("OneWeek", context, x => x.TpsandGasDataWeeks, TimeSpan.FromDays(7))
        {

        }
    }
}
