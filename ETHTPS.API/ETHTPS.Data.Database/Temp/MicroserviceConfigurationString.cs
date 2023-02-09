using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class MicroserviceConfigurationString
{
    public int Id { get; set; }

    public int MicroserviceId { get; set; }

    public int ConfigurationStringId { get; set; }

    public int EnvironmentId { get; set; }

    public virtual ConfigurationString ConfigurationString { get; set; } = null!;

    public virtual Environment Environment { get; set; } = null!;

    public virtual Microservice Microservice { get; set; } = null!;
}
