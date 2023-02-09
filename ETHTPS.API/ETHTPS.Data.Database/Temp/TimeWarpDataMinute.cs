using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class TimeWarpDataMinute
{
    public int Id { get; set; }

    public int Network { get; set; }

    public int Provider { get; set; }

    public int? Block { get; set; }

    public DateTime StartDate { get; set; }

    public double AverageTps { get; set; }

    public double AverageGps { get; set; }

    public virtual Network NetworkNavigation { get; set; } = null!;

    public virtual Provider ProviderNavigation { get; set; } = null!;
}
