using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class OldestLoggedHistoricalEntry
{
    public int Id { get; set; }

    public int Network { get; set; }

    public int Provider { get; set; }

    public int OldestBlock { get; set; }
    public DateTime? OldestBlockDate { get; set; }

    public virtual Network NetworkNavigation { get; set; }

    public virtual Provider ProviderNavigation { get; set; }
}
