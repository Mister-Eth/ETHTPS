using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ExperimentResult
{
    public int Id { get; set; }

    public int Experiment { get; set; }

    public int AverageRetentionSeconds { get; set; }

    public int SdretentionSeconds { get; set; }

    public int AveragePercentageReturnVisitors { get; set; }

    public int SdpercentageReturnVisitors { get; set; }

    public virtual Experiment ExperimentNavigation { get; set; }
}
