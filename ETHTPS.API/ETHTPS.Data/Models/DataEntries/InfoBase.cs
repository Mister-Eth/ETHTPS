
using ETHTPS.Data.Core;

using InfluxDB.Client.Core;

using System;

namespace ETHTPS.Data.Core.Models.DataEntries
{
    public abstract class InfoBase : IMeasurement
    {
        [Column("blocknumber")]
        public int BlockNumber { get; set; }
        [Column("date", IsTimestamp = true)]
        public DateTime Date { get; set; }
    }
}
