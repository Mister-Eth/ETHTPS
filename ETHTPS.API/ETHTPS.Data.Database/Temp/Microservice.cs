using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class Microservice
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<MicroserviceConfigurationString> MicroserviceConfigurationStrings { get; } = new List<MicroserviceConfigurationString>();
}
