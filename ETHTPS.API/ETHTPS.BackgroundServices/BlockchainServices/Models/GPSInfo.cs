using InfluxDB.Client.Core;

namespace ETHTPS.Services.BlockchainServices.Models
{
    [Measurement("gps")]
    public class GPSInfo : InfoBase
    {
        [Column("tps")]
        public double GPS { get; set; }
    }
}
