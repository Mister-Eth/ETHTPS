using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class ExperimentalSession
{
    public int Id { get; set; }

    public int Experiment { get; set; }

    public string TargetIpaddress { get; set; }

    public int RetentionSeconds { get; set; }

    public virtual Experiment IdNavigation { get; set; }
}
