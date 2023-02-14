namespace ETHTPS.Data.Models.ResponseModels.ChartData.Streamchart
{
    public class StreamchartModel
    {
        public LegendModel Legend { get; set; }
        public double[][] TPSData { get; set; }
        public double[][] GPSData { get; set; }
        public double[][] GTPSData { get; set; }
    }
}
