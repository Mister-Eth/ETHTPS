using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class LatestEntry
    {
        public int Id { get; set; }
        public int? Provider { get; set; }
        public int? Entry { get; set; }

        public virtual Tpsdatum EntryNavigation { get; set; }
        public virtual Provider ProviderNavigation { get; set; }
    }
}
