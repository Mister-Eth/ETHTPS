namespace ETHTPS.Data.Core.Models.ResponseModels.ChartData.Streamchart
{
    public class StreamchartModel
    {
        public LegendModel Legend { get; set; }
        public double[][] TPSData { get; set; }
        public double MaxTPS { get; set; } = 0;
        public double[][] GPSData { get; set; }
        public double MaxGPS { get; set; } = 0;
        public double[][] GTPSData { get; set; }
        public double MaxGTPS { get; set; } = 0;
    }
}
