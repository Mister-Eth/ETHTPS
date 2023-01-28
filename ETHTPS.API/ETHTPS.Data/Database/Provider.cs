using System;
using System.Collections.Generic;
using ETHTPS.Data.Database;

namespace ETHTPS.Data.Database;

public partial class Provider
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int Type { get; set; }

    public string Color { get; set; }

    public bool? IsGeneralPurpose { get; set; }

    public int? HistoricalAggregationDeltaBlock { get; set; }

    public bool Enabled { get; set; }

    public int? SubchainOf { get; set; }

    public int TheoreticalMaxTps { get; set; }

    public virtual ICollection<Experiment> Experiments { get; } = new List<Experiment>();

    public virtual ICollection<Provider> InverseSubchainOfNavigation { get; } = new List<Provider>();

    public virtual ICollection<OldestLoggedHistoricalEntry> OldestLoggedHistoricalEntries { get; } = new List<OldestLoggedHistoricalEntry>();

    public virtual ICollection<OldestLoggedTimeWarpBlock> OldestLoggedTimeWarpBlocks { get; } = new List<OldestLoggedTimeWarpBlock>();

    public virtual ICollection<Project> Projects { get; } = new List<Project>();

    public virtual Provider SubchainOfNavigation { get; set; }

    public virtual ICollection<TimeWarpDatum> TimeWarpData { get; } = new List<TimeWarpDatum>();

    public virtual ICollection<TimeWarpDataDay> TimeWarpDataDays { get; } = new List<TimeWarpDataDay>();

    public virtual ICollection<TimeWarpDataHour> TimeWarpDataHours { get; } = new List<TimeWarpDataHour>();

    public virtual ICollection<TimeWarpDataMinute> TimeWarpDataMinutes { get; } = new List<TimeWarpDataMinute>();

    public virtual ICollection<TimeWarpDataWeek> TimeWarpDataWeeks { get; } = new List<TimeWarpDataWeek>();

    public virtual ICollection<TpsandGasDataAll> TpsandGasDataAlls { get; } = new List<TpsandGasDataAll>();

    public virtual ICollection<TpsandGasDataDay> TpsandGasDataDays { get; } = new List<TpsandGasDataDay>();

    public virtual ICollection<TpsandGasDataHour> TpsandGasDataHours { get; } = new List<TpsandGasDataHour>();

    public virtual TpsandGasDataLatest TpsandGasDataLatest { get; set; }

    public virtual TpsandGasDataMax TpsandGasDataMax { get; set; }

    public virtual ICollection<TpsandGasDataMonth> TpsandGasDataMonths { get; } = new List<TpsandGasDataMonth>();

    public virtual ICollection<TpsandGasDataWeek> TpsandGasDataWeeks { get; } = new List<TpsandGasDataWeek>();

    public virtual ICollection<TpsandGasDataYear> TpsandGasDataYears { get; } = new List<TpsandGasDataYear>();

    public virtual ProviderType TypeNavigation { get; set; }
}
