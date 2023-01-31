using Newtonsoft.Json;

using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class Experiment
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public int Target { get; set; }

    public int RunParameters { get; set; }

    [JsonIgnore]
    public virtual ICollection<ApikeyExperimentBinding> ApikeyExperimentBindings { get; } = new List<ApikeyExperimentBinding>();

    [JsonIgnore]
    public virtual ICollection<ExperimentFeedback> ExperimentFeedbacks { get; } = new List<ExperimentFeedback>();

    [JsonIgnore]
    public virtual ICollection<ExperimentResult> ExperimentResults { get; } = new List<ExperimentResult>();

    [JsonIgnore]
    public virtual ExperimentalSession ExperimentalSession { get; set; }

    [JsonIgnore]
    public virtual Provider Project { get; set; }

    [JsonIgnore]
    public virtual ExperimentRunParameter RunParametersNavigation { get; set; }

    [JsonIgnore]
    public virtual ExperimentTarget TargetNavigation { get; set; }
}
