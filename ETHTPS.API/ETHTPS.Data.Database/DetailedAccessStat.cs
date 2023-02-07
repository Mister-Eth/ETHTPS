using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class DetailedAccessStat
{
    public int Id { get; set; }

    public string Path { get; set; }

    public double RequestTimeMs { get; set; }

    public string Ipaddress { get; set; }

    public DateTime Date { get; set; }
}
