using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Provider
    {
        public Provider()
        {
            LatestEntries = new HashSet<LatestEntry>();
            MaxTpsentries = new HashSet<MaxTpsentry>();
            ProviderProperties = new HashSet<ProviderProperty>();
            Tpsdata = new HashSet<Tpsdatum>();
            TpsdataDays = new HashSet<TpsdataDay>();
            TpsdataHours = new HashSet<TpsdataHour>();
            TpsdataMonths = new HashSet<TpsdataMonth>();
            TpsdataWeeks = new HashSet<TpsdataWeek>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? Type { get; set; }

        public virtual ProviderType TypeNavigation { get; set; }
        public virtual ICollection<LatestEntry> LatestEntries { get; set; }
        public virtual ICollection<MaxTpsentry> MaxTpsentries { get; set; }
        public virtual ICollection<ProviderProperty> ProviderProperties { get; set; }
        public virtual ICollection<Tpsdatum> Tpsdata { get; set; }
        public virtual ICollection<TpsdataDay> TpsdataDays { get; set; }
        public virtual ICollection<TpsdataHour> TpsdataHours { get; set; }
        public virtual ICollection<TpsdataMonth> TpsdataMonths { get; set; }
        public virtual ICollection<TpsdataWeek> TpsdataWeeks { get; set; }
    }
}
