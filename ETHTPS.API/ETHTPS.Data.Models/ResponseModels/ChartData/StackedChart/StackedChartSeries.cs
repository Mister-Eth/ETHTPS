namespace ETHTPS.Data.Models.ResponseModels.ChartData.StackedChart
{
    public class StackedChartSeries
    {
        public IEnumerable<StackedChartDataPoint> DataPoints { get; set; }
        public double MaxValue => DataPoints.Max(x => x.Y ?? 0);
        public string Provider { get; set; }
    }
}
