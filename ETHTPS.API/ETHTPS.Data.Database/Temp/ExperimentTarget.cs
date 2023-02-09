using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ExperimentTarget
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int Type { get; set; }

    public virtual ICollection<Experiment> Experiments { get; } = new List<Experiment>();

    public virtual ExperimentTargetType TypeNavigation { get; set; } = null!;
}
