using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ExternalWebsiteCategory
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<ExternalWebsite> ExternalWebsites { get; } = new List<ExternalWebsite>();
}
