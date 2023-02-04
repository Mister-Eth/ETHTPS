namespace ETHTPS.Data.Database.TimeWarp
{
    public interface ITimeWarpDataProvider : ITimeWarpService
    {
        public string Interval { get; set; }
    }
}
