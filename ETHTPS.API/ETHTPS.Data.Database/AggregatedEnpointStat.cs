namespace ETHTPS.Data.Integrations.MSSQL
{
    public class AggregatedEnpointStat
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public int AverageRequestTimeMs { get; set; }
        public int RequestCount { get; set; }
    }
}
