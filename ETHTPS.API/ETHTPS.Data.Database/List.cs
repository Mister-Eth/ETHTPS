using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class List
{
    public long Id { get; set; }

    public string Key { get; set; }

    public string Value { get; set; }

    public DateTime? ExpireAt { get; set; }
}
