using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Infrastructure.Database.Models.A
{
    public partial class LatestEntry
    {
        public int Id { get; set; }
        public int? Provider { get; set; }
        public int? Entry { get; set; }
    }
}
