namespace ETHTPS.Data.Integrations.MSSQL.TimeWarp.Models
{
    public class TimeWarpSyncProgressModel
    {
        public int CurrentBlock { get; set; }

        public int LatestBlockHeight { get; set; }
    }
}
