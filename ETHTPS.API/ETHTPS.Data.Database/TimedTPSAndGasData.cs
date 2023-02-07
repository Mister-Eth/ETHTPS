using System;

namespace ETHTPS.Data.Integrations.MSSQL
{
    public class TimedTPSAndGasData : TPSAndGasDataBase
    {
        public DateTime StartDate { get; set; }
        public double AverageTps { get; set; }
        public double AverageGps { get; set; }
        public int ReadingsCount { get; set; }
        //public string OclhJson { get; set; }
    }

    public class TpsandGasDataDay : TimedTPSAndGasData { }
    public class TpsandGasDataHour : TimedTPSAndGasData { }
    public class TpsandGasDataWeek : TimedTPSAndGasData { }
    public class TpsandGasDataMinute:  TimedTPSAndGasData { }
    public class TpsandGasDataMonth : TimedTPSAndGasData { }
    public class TpsandGasDataAll : TimedTPSAndGasData { }
    public class TpsandGasDataYear : TimedTPSAndGasData { }
}
