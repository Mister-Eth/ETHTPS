using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class AppConfigurationValue
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Value { get; set; }
}
