using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices
{
    public class BlockInfo
    {
        public int BlockNumber { get; set; }
        public int TransactionCount { get; set; }
        public double GasUsed { get; set; }
        public DateTime Date { get; set; }
        public bool Settled { get; set; } = true;

        public static TPSGPSInfo operator -(BlockInfo a, BlockInfo b)
        {
            return new TPSGPSInfo()
            {
                Date = a.Date,
                BlockNumber = a.BlockNumber,
                TPS = (a.TransactionCount) / (a.Date.Subtract(b.Date).TotalSeconds),
                GPS = (a.GasUsed) / (a.Date.Subtract(b.Date).TotalSeconds),
            };
        }
    }
}
