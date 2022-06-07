using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Feature
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public bool Enabled { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }

        public virtual Project Project { get; set; }
    }
}
