using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class JobQueue
{
    public long Id { get; set; }

    public long JobId { get; set; }

    public string Queue { get; set; }

    public DateTime? FetchedAt { get; set; }
}
