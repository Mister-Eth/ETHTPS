using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Project
    {
        public Project()
        {
            Features = new HashSet<Feature>();
        }

        public int Id { get; set; }
        public bool Enabled { get; set; }
        public int? Provider { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }
        public string Details { get; set; }

        public virtual Provider ProviderNavigation { get; set; }
        public virtual ICollection<Feature> Features { get; set; }
    }
}
