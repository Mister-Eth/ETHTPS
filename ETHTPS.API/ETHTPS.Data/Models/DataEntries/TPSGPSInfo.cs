namespace ETHTPS.Data.Core.Models.DataEntries.BlockchainServices.Models
{
    public class TPSGPSInfo : InfoBase
    {
        public double TPS { get; set; }
        public double GPS { get; set; }
        public string Provider { get; set; }
        public (TPSInfo TPSInfo, GPSInfo GPSInfo) Split()
        {
            return (new TPSInfo()
            {
                Date = Date,
                BlockNumber = BlockNumber,
                TPS = TPS
            }, new GPSInfo()
            {
                Date = Date,
                BlockNumber = BlockNumber,
                GPS = GPS
            });
        }
    }
}
