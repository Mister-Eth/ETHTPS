using System;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders
{
    public class AllHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataAll>
    {
        public AllHistoricalDataProvider(EthtpsContext context) : base("All", context, x => x.TpsandGasDataAlls, TimeSpan.MaxValue)
        {

        }
    }
}
