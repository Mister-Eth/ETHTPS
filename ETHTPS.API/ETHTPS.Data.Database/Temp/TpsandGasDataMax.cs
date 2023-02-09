using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class TpsandGasDataMax
{
    public int Id { get; set; }

    public int Provider { get; set; }

    public int Network { get; set; }

    public DateTime Date { get; set; }

    public double MaxTps { get; set; }

    public double MaxGps { get; set; }

    public int? MaxTpsblockNumber { get; set; }

    public int? MaxGpsblockNumber { get; set; }

    public virtual Network NetworkNavigation { get; set; } = null!;

    public virtual Provider ProviderNavigation { get; set; } = null!;
}
