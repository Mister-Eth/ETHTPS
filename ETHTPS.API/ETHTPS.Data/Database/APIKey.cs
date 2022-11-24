
using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class APIKey
    {
        public int Id { get; set; }
        public string KeyHash { get; set; }
        public int TotalCalls { get; set; }
        public int CallsLast24h { get; set; }
        public int Limit24h { get; set; }
    }
}
