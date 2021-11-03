using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class TpsandGasDataWeek
    {
        public int Id { get; set; }
        public int Network { get; set; }
        public int Provider { get; set; }
        public DateTime StartDate { get; set; }
        public double AverageTps { get; set; }
        public double AverageGps { get; set; }
        public int ReadingsCount { get; set; }

        public virtual Network NetworkNavigation { get; set; }
        public virtual Provider ProviderNavigation { get; set; }
    }
}
