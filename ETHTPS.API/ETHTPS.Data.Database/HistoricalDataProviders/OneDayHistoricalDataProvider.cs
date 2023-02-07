using System;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataProviders
{
    public class OneDayHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataDay>
    {
        public OneDayHistoricalDataProvider(EthtpsContext context) : base("OneDay", context, x => x.TpsandGasDataDays, TimeSpan.FromDays(1))
        {

        }
    }
}
