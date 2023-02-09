using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class LiveDataUpdaterStatus
{
    public int Id { get; set; }

    public int UpdaterId { get; set; }

    public int StatusId { get; set; }

    public DateTime? LastSuccessfulRunTime { get; set; }

    public int NumberOfSuccesses { get; set; }

    public int NumberOfFailures { get; set; }

    public virtual DataUpdaterStatus Status { get; set; } = null!;

    public virtual DataUpdater Updater { get; set; } = null!;
}
