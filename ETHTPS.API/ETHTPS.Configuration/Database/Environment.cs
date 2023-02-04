using System;
using System.Collections.Generic;

namespace ETHTPS.Configuration.Database;

public partial class Environment
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<MicroserviceConfigurationString> MicroserviceConfigurationStrings { get; } = new List<MicroserviceConfigurationString>();

    public virtual ICollection<ProviderConfigurationString> ProviderConfigurationStrings { get; } = new List<ProviderConfigurationString>();
}
