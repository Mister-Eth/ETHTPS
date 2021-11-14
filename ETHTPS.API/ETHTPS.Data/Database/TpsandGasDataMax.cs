using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class TpsandGasDataMax : TPSAndGasDataBase
    {
        public DateTime Date { get; set; }
        public double MaxTps { get; set; }
        public double MaxGps { get; set; }
    }
}
