using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ExperimentFeedback
{
    public int Id { get; set; }

    public int Experiment { get; set; }

    public bool? Vote { get; set; }

    public int? Rating { get; set; }

    public string Text { get; set; }

    public virtual Experiment ExperimentNavigation { get; set; }
}
