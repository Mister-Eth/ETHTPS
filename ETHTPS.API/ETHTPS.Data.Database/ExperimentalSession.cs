using ETHTPS.Data.Models;

using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ExperimentalSession :EntityWIthId
{

    public int Experiment { get; set; }

    public string TargetIpaddress { get; set; }

    public int RetentionSeconds { get; set; }

    public virtual Experiment IdNavigation { get; set; }
}
