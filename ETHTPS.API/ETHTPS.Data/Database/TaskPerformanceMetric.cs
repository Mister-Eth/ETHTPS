using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class TaskPerformanceMetric
    {
        public int Id { get; set; }
        public int? Machine { get; set; }
        public string TaskName { get; set; }
        public int? RunCount { get; set; }
        public double? AverageRunTime { get; set; }
    }
}
