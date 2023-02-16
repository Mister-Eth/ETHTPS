namespace ETHTPS.Data.Core.Models.Queries.Data.Requests
{
    public class ChartDataRequestModel : ProviderQueryModel
    {
        public TimeInterval Interval { get; set; } = TimeInterval.OneDay;
        public int Count { get; set; } = -1;
        public string DataType { get; set; } = "tps";
        public int CombineSeriesWithAverageLessThanPercentage { get; set; } = 0;
        public bool OrderByDateAscending { get; set; } = true;
        public bool NoDuplicates { get; set; } = true;
        public bool RemoveNullValues { get; set; } = true;
    }
}
