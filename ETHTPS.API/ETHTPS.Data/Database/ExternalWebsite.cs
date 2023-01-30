using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class ExternalWebsite
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string IconBase64 { get; set; }

    public string Category { get; set; }

    public virtual ICollection<ProviderLink> ProviderLinks { get; } = new List<ProviderLink>();
}
