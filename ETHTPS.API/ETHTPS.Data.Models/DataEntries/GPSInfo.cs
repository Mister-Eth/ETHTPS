﻿using InfluxDB.Client.Core;

namespace ETHTPS.Data.Models.DataEntries
{
    [Measurement("gps")]
    public class GPSInfo : InfoBase
    {
        [Column("tps")]
        public double GPS { get; set; }
    }
}
