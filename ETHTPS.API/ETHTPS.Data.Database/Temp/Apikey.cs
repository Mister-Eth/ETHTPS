using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class Apikey
{
    public int Id { get; set; }

    public string KeyHash { get; set; } = null!;

    public int TotalCalls { get; set; }

    public int CallsLast24h { get; set; }

    public int Limit24h { get; set; }

    public string RequesterIpaddress { get; set; } = null!;

    public virtual ICollection<ApikeyExperimentBinding> ApikeyExperimentBindings { get; } = new List<ApikeyExperimentBinding>();

    public virtual ICollection<ApikeyGroup> ApikeyGroups { get; } = new List<ApikeyGroup>();
}
