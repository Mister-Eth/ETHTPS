using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class CachedResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string KeyJson { get; set; } = null!;

    public string ValueJson { get; set; } = null!;
}
