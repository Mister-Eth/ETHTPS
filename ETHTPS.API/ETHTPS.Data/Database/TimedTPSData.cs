using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETHTPS.Data.Database
{
    public abstract class TimedTPSData
    {
        public int Id { get; set; }
        public int? Network { get; set; }
        public int? Provider { get; set; }
        public DateTime? StartDate { get; set; }
        public double? AverageTps { get; set; }
        public int? ReadingsCount { get; set; }
    }

    public partial class DayTPSData : TimedTPSData {    }
    public partial class HourTPSData: TimedTPSData {    }
    public partial class WeekTPSData : TimedTPSData {    }
    public partial class MonthTPSData : TimedTPSData {    }
}
