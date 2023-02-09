using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class Set
{
    public string Key { get; set; } = null!;

    public double Score { get; set; }

    public string Value { get; set; } = null!;

    public DateTime? ExpireAt { get; set; }
}
