using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ExperimentTargetType
{
    public int Id { get; set; }

    public string TargetTypeName { get; set; } = null!;

    public string TargetTypeValue { get; set; } = null!;

    public virtual ICollection<ExperimentTarget> ExperimentTargets { get; } = new List<ExperimentTarget>();
}
