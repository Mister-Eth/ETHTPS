using ETHTPS.Data.Integrations.InfluxIntegration;
using ETHTPS.Services.BlockchainServices.Models;

using InfluxDB.Client.Core;

using System;

namespace ETHTPS.Services.BlockchainServices
{
    [Measurement("blockinfo")]
    public class BlockInfo : IMeasurement
    {
        [Column("blocknumber")]
        public int BlockNumber { get; set; }
        [Column("transactioncount")]
        public int TransactionCount { get; set; }
        [Column("gasused")]
        public double GasUsed { get; set; }
        [Column("date", IsTimestamp = true)]
        public DateTime Date { get; set; }
        [Column("settled")]
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
