using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class OneDayHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataDay>
    {
        public OneDayHistoricalDataProvider(ETHTPSContext context) : base("OneDay", context, x => x.TpsandGasDataDays, TimeSpan.FromDays(1))
        {

        }
    }
}
