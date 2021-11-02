using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Network
    {
        public Network()
        {
            Tpsdata = new HashSet<Tpsdatum>();
            TpsdataDays = new HashSet<TpsdataDay>();
            TpsdataHours = new HashSet<TpsdataHour>();
            TpsdataMonths = new HashSet<TpsdataMonth>();
            TpsdataWeeks = new HashSet<TpsdataWeek>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Tpsdatum> Tpsdata { get; set; }
        public virtual ICollection<TpsdataDay> TpsdataDays { get; set; }
        public virtual ICollection<TpsdataHour> TpsdataHours { get; set; }
        public virtual ICollection<TpsdataMonth> TpsdataMonths { get; set; }
        public virtual ICollection<TpsdataWeek> TpsdataWeeks { get; set; }
    }
}
