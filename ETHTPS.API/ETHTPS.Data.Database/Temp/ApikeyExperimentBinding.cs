using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ApikeyExperimentBinding
{
    public int Id { get; set; }

    public int ExperimentId { get; set; }

    public int ApikeyId { get; set; }

    public virtual Apikey Apikey { get; set; } = null!;

    public virtual Experiment Experiment { get; set; } = null!;
}
