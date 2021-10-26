using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class MaxTPSEntry
    {
        public int Id { get; set; }
        public int? Provider { get; set; }
        public int? Entry { get; set; }
    }
}
