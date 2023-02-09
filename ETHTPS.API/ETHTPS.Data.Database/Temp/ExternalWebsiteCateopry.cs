using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ExternalWebsiteCateopry
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<ExternalWebsite> ExternalWebsites { get; } = new List<ExternalWebsite>();
}
