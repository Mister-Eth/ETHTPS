using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ProviderType
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Color { get; set; }

    public bool IsGeneralPurpose { get; set; }

    public bool Enabled { get; set; }

    public virtual ICollection<Provider> Providers { get; } = new List<Provider>();
}
