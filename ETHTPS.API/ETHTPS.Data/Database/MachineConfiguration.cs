using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class MachineConfiguration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CPUCoreCount { get; set; }
        public int? TotalRam { get; set; }
    }
}
