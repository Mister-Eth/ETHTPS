using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ExperimentalSession
{
    public int Id { get; set; }

    public int Experiment { get; set; }

    public string TargetIpaddress { get; set; } = null!;

    public int RetentionSeconds { get; set; }

    public virtual Experiment IdNavigation { get; set; } = null!;
}
