using System;
using System.Collections.Generic;

namespace ETHTPS.Configuration.Database;

public partial class ProviderConfigurationString
{
    public int Id { get; set; }

    public int ProviderId { get; set; }

    public int ConfigurationStringId { get; set; }

    public int EnvironmentId { get; set; }

    public virtual ConfigurationString ConfigurationString { get; set; } = null!;

    public virtual Environment Environment { get; set; } = null!;

    public virtual Provider Provider { get; set; } = null!;
}
