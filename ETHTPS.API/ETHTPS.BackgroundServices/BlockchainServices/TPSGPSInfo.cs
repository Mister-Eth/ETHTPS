using System;

namespace ETHTPS.Services.BlockchainServices
{
    public class TPSGPSInfo
    {
        public int BlockNumber { get; set; }
        public DateTime Date { get; set; }
        public double TPS { get; set; }
        public double GPS { get; set; }
    }
}
