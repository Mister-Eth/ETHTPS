using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ProviderType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Color { get; set; } = null!;

    public bool IsGeneralPurpose { get; set; }

    public bool Enabled { get; set; }

    public virtual ICollection<Provider> Providers { get; } = new List<Provider>();
}
