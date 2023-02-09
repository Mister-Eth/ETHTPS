using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class Experiment
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int Target { get; set; }

    public int RunParameters { get; set; }

    public virtual ICollection<ApikeyExperimentBinding> ApikeyExperimentBindings { get; } = new List<ApikeyExperimentBinding>();

    public virtual ICollection<ExperimentFeedback> ExperimentFeedbacks { get; } = new List<ExperimentFeedback>();

    public virtual ICollection<ExperimentResult> ExperimentResults { get; } = new List<ExperimentResult>();

    public virtual ExperimentalSession? ExperimentalSession { get; set; }

    public virtual Provider Project { get; set; } = null!;

    public virtual ExperimentRunParameter RunParametersNavigation { get; set; } = null!;

    public virtual ExperimentTarget TargetNavigation { get; set; } = null!;
}
