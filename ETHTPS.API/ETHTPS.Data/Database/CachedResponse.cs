﻿using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class CachedResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string KeyJson { get; set; }
        public string ValueJson { get; set; }
    }
}
