using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Tpsdatum
    {
        public Tpsdatum()
        {
            LatestEntries = new HashSet<LatestEntry>();
            MaxTpsentries = new HashSet<MaxTpsentry>();
        }

        public int Id { get; set; }
        public int? Provider { get; set; }
        public DateTime? Date { get; set; }
        public string Block { get; set; }
        public double? Tps { get; set; }
        public int? Network { get; set; }

        public virtual Network NetworkNavigation { get; set; }
        public virtual Provider ProviderNavigation { get; set; }
        public virtual ICollection<LatestEntry> LatestEntries { get; set; }
        public virtual ICollection<MaxTpsentry> MaxTpsentries { get; set; }
    }
}
