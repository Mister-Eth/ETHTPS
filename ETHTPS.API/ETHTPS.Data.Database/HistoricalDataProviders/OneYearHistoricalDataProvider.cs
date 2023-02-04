using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneYearHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataYear>
    {
        public OneYearHistoricalDataProvider(EthtpsContext context) : base("OneYear", context, x => x.TpsandGasDataYears, TimeSpan.FromDays(365))
        {

        }
    }
}
