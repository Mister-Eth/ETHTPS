using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class DataUpdater
{
    public int Id { get; set; }

    public int TypeId { get; set; }

    public int ProviderId { get; set; }

    public virtual ICollection<LiveDataUpdaterStatus> LiveDataUpdaterStatuses { get; } = new List<LiveDataUpdaterStatus>();

    public virtual Provider Provider { get; set; } = null!;

    public virtual DataUpdaterType Type { get; set; } = null!;
}
