using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database
{
    public abstract class TimedTPSAndGasData : TPSAndGasDataBase
    {
        public DateTime StartDate { get; set; }
        public double AverageTps { get; set; }
        public double AverageGps { get; set; }
        public int ReadingsCount { get; set; }
    }

    public class TpsandGasDataDay : TimedTPSAndGasData { }
    public class TpsandGasDataHour : TimedTPSAndGasData { }
    public class TpsandGasDataWeek : TimedTPSAndGasData { }
    public class TpsandGasDataMonth : TimedTPSAndGasData { }
    public class TpsandGasDataAll : TimedTPSAndGasData { }
    public class TpsandGasDataYear : TimedTPSAndGasData { }
}
