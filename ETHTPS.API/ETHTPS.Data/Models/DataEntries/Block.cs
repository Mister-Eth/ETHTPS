using ETHTPS.Data.Core;
using ETHTPS.Data.Core.Models.DataEntries.BlockchainServices.Models;

using InfluxDB.Client.Core;

using System;

namespace ETHTPS.Data.Core.Models.DataEntries
{
    [Measurement("blockinfo")]
    public class Block : IBlock
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
        [Column("provider", IsTag = true)]
        public string Provider { get; set; }

        public override string ToString() => $"{Provider} #{BlockNumber}";
        public static TPSGPSInfo operator -(Block a, Block b) => new()
        {
            Date = a.Date,
            BlockNumber = a.BlockNumber,
            TPS = (a.TransactionCount) / (a.Date.Subtract(b.Date).TotalSeconds),
            GPS = (a.GasUsed) / (a.Date.Subtract(b.Date).TotalSeconds),
            Provider = a.Provider,
        };
    }
}
