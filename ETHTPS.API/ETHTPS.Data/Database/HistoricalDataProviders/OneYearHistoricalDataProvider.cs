using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneYearHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataYear>
    {
        public OneYearHistoricalDataProvider(ETHTPSContext context) : base("OneYear", context, x => x.TpsandGasDataYears, TimeSpan.FromDays(365))
        {

        }
    }
}
