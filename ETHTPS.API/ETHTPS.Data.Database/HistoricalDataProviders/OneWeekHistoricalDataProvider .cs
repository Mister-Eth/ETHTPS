using System;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public class OneWeekHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataWeek>
    {
        public OneWeekHistoricalDataProvider(EthtpsContext context) : base(Core.TimeInterval.OneWeek, context, x => x.TpsandGasDataWeeks, TimeSpan.FromDays(7))
        {

        }
    }
}
