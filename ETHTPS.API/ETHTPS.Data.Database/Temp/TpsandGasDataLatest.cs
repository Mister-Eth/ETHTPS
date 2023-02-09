using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class TpsandGasDataLatest
{
    public int Id { get; set; }

    public int Provider { get; set; }

    public int Network { get; set; }

    public double Tps { get; set; }

    public double Gps { get; set; }

    public virtual Network NetworkNavigation { get; set; } = null!;

    public virtual Provider ProviderNavigation { get; set; } = null!;
}
