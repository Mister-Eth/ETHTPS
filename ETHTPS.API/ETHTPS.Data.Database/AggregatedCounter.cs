﻿using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class AggregatedCounter
{
    public string Key { get; set; }

    public long Value { get; set; }

    public DateTime? ExpireAt { get; set; }
}
