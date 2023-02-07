using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ExperimentTargetType
{
    public int Id { get; set; }

    public string TargetTypeName { get; set; }

    public string TargetTypeValue { get; set; }

    public virtual ICollection<ExperimentTarget> ExperimentTargets { get; } = new List<ExperimentTarget>();
}
