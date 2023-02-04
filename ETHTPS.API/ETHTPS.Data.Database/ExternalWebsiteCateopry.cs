using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class ExternalWebsiteCateopry
{
    public int Id { get; set; }

    public string Name { get; set; }

    public virtual ICollection<ExternalWebsite> ExternalWebsites { get; } = new List<ExternalWebsite>();
}
