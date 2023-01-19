using System;

namespace ETHTPS.Data.Database.HistoricalDataProviders
{
    public class AllHistoricalDataProvider : HistoricalDataProviderBase<TpsandGasDataAll>
    {
        public AllHistoricalDataProvider(ETHTPSContext context) : base("All", context, x => x.TpsandGasDataAlls, TimeSpan.MaxValue)
        {

        }
    }
}
