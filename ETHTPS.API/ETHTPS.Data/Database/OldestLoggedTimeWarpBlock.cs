using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class OldestLoggedTimeWarpBlock
    {
        public int Id { get; set; }
        public int Network { get; set; }
        public int Provider { get; set; }
        public int OldestBlock { get; set; }

        public virtual Network NetworkNavigation { get; set; }
        public virtual Provider ProviderNavigation { get; set; }
    }
}
