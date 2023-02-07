using InfluxDB.Client.Core;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Services.BlockchainServices.Models
{
    [Measurement("tps")]
    public class TPSInfo : InfoBase
    {
        [Column("tps")]
        public double TPS { get; set; }
    }
}
