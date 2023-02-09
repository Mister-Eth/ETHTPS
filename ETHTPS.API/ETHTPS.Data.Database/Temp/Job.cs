using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class Job
{
    public long Id { get; set; }

    public long? StateId { get; set; }

    public string? StateName { get; set; }

    public string InvocationData { get; set; } = null!;

    public string Arguments { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? ExpireAt { get; set; }

    public virtual ICollection<JobParameter> JobParameters { get; } = new List<JobParameter>();

    public virtual ICollection<State> States { get; } = new List<State>();
}
