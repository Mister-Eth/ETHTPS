using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class DetailedAccessStat
{
    public int Id { get; set; }

    public string Path { get; set; } = null!;

    public double RequestTimeMs { get; set; }

    public string Ipaddress { get; set; } = null!;

    public DateTime Date { get; set; }
}
