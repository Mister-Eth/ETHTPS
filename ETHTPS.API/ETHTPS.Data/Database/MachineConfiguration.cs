using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class MachineConfiguration
    {
        public MachineConfiguration()
        {
            TaskPerformanceMetrics = new HashSet<TaskPerformanceMetric>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? CpucoreCount { get; set; }
        public int? TotalRam { get; set; }

        public virtual ICollection<TaskPerformanceMetric> TaskPerformanceMetrics { get; set; }
    }
}
