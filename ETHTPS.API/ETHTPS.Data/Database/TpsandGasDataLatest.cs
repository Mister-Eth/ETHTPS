using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class TpsandGasDataLatest : TPSAndGasDataBase
    {
        public double Tps { get; set; }
        public double Gps { get; set; }
    }
}
