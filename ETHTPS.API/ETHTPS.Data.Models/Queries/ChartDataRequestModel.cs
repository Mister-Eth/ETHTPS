namespace ETHTPS.Data.Models.Queries
{
    public class ChartDataRequestModel : ProviderQueryModel
    {
        public string Interval { get; set; } = "OneDay";
        public int Count { get; set; } = -1;
        public string DataType { get; set; } = "tps";
        public int CombineSeriesWithAverageLessThanPercentage { get; set; } = 0;
        public bool OrderByDateAscending { get; set; } = true;
        public bool NoDuplicates { get; set; } = true;
        public bool RemoveNullValues { get; set; } = true;
    }
}
