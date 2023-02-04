using System;
using System.Collections.Generic;

namespace ETHTPS.Configuration.Database;

public partial class Microservice : IMicroservice
{
    public int Id { get; set; }
    public virtual ICollection<MicroserviceConfigurationString> MicroserviceConfigurationStrings { get; } = new List<MicroserviceConfigurationString>();
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}
