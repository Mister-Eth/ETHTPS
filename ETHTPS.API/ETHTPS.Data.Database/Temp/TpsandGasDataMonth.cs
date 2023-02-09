using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class TpsandGasDataMonth
{
    public int Id { get; set; }

    public int Network { get; set; }

    public int Provider { get; set; }

    public DateTime StartDate { get; set; }

    public double AverageTps { get; set; }

    public double AverageGps { get; set; }

    public int ReadingsCount { get; set; }

    public string? OclhJson { get; set; }

    public virtual Network NetworkNavigation { get; set; } = null!;

    public virtual Provider ProviderNavigation { get; set; } = null!;
}
