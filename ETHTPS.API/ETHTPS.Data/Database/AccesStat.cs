using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class AccesStat
    {
        public int Id { get; set; }
        public string Project { get; set; }
        public string Path { get; set; }
        public int Count { get; set; }
        public double AverageRequestTimeMs { get; set; }
        public int ExternalCount { get; set; }
    }
}
