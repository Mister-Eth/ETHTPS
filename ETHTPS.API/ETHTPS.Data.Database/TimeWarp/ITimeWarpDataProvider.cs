namespace ETHTPS.Data.Integrations.MSSQL.TimeWarp
{
    public interface ITimeWarpDataProvider : ITimeWarpService
    {
        public string Interval { get; set; }
    }
}
