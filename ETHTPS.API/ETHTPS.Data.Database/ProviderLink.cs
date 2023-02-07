using Newtonsoft.Json;

using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class ProviderLink
{
    public int Id { get; set; }

    public int ProviderId { get; set; }

    public int ExternalWebsiteId { get; set; }

    public string Link { get; set; }

    public virtual ExternalWebsite ExternalWebsite { get; set; }

    public virtual Provider Provider { get; set; }
}
