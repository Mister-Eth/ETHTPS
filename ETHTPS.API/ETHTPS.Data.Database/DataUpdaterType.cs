using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class DataUpdaterType
{
    public int Id { get; set; }

    public string TypeName { get; set; } = null!;

    public virtual ICollection<DataUpdater> DataUpdaters { get; } = new List<DataUpdater>();
}
