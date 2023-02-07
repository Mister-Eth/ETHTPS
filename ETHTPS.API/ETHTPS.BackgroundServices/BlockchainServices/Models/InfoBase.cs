using InfluxDB.Client.Core;

using System;

namespace ETHTPS.Services.BlockchainServices.Models
{
    public abstract class InfoBase : IMeasurement
    {
        [Column("blocknumber")]
        public int BlockNumber { get; set; }
        [Column("date", IsTimestamp = true)]
        public DateTime Date { get; set; }
    }
}
