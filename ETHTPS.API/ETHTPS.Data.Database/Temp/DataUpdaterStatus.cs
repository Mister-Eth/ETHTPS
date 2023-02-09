using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class DataUpdaterStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<LiveDataUpdaterStatus> LiveDataUpdaterStatuses { get; } = new List<LiveDataUpdaterStatus>();
}
