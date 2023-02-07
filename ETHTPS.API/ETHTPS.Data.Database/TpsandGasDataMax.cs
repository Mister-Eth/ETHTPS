using System;

#nullable disable

namespace ETHTPS.Data.Integrations.MSSQL
{
    public partial class TpsandGasDataMax : TPSAndGasDataBase
    {
        public DateTime Date { get; set; }
        public double MaxTps { get; set; }
        public double MaxGps { get; set; }
        public int? MaxTpsblockNumber { get; set; }
        public int? MaxGpsblockNumber { get; set; }
    }
}
