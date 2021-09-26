using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.API.Infrastructure.Database.Models
{
    public partial class TPSData
    {
        public int Id { get; set; }
        public int? Provider { get; set; }
        public DateTime? Date { get; set; }
        public string Block { get; set; }
        public double? Tps { get; set; }
    }
}
