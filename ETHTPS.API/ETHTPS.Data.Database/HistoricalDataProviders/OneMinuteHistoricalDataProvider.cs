namespace ETHTPS.Data.Integrations.MSSQL.HistoricalDataServices
{
    public class OneMinuteHistoricalDataProvider : HistoricalTimedTPSAndGasDataProviderBase<TpsandGasDataMinute>
    {
        public OneMinuteHistoricalDataProvider(EthtpsContext context) : base(Core.TimeInterval.OneMinute, context, x => x.TpsandGasDataMinutes
        , TimeSpan.FromSeconds(60))
        {

        }
    }
}
