using System;

namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public class OneDayHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataDay>
    {
        public OneDayHistoricalDataProvider(EthtpsContext context) : base(Core.TimeInterval.OneDay, context, x => x.TpsandGasDataDays, TimeSpan.FromDays(1))
        {

        }
    }
}
