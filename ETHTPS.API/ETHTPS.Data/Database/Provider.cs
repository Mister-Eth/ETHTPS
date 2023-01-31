using Newtonsoft.Json;

using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class Provider : EntityWIthId
{
    public string Name { get; set; }

    public int Type { get; set; }

    public string Color { get; set; }

    public bool? IsGeneralPurpose { get; set; }

    public int? HistoricalAggregationDeltaBlock { get; set; }

    public bool Enabled { get; set; }

    public int? SubchainOf { get; set; }

    public int TheoreticalMaxTps { get; set; }

    [JsonIgnore] public virtual ICollection<Experiment> Experiments { get; } = new List<Experiment>();

    [JsonIgnore] public virtual ICollection<Provider> InverseSubchainOfNavigation { get; } = new List<Provider>();

    [JsonIgnore] public virtual ICollection<OldestLoggedHistoricalEntry> OldestLoggedHistoricalEntries { get; } = new List<OldestLoggedHistoricalEntry>();

    [JsonIgnore] public virtual ICollection<OldestLoggedTimeWarpBlock> OldestLoggedTimeWarpBlocks { get; } = new List<OldestLoggedTimeWarpBlock>();

    [JsonIgnore] public virtual ICollection<Project> Projects { get; } = new List<Project>();

    [JsonIgnore] public virtual ICollection<ProviderDetailsMarkdownPage> ProviderDetailsMarkdownPages { get; } = new List<ProviderDetailsMarkdownPage>();

    [JsonIgnore] public virtual ICollection<ProviderLink> ProviderLinks { get; } = new List<ProviderLink>();

    [JsonIgnore] public virtual Provider SubchainOfNavigation { get; set; }

    [JsonIgnore] public virtual ICollection<TimeWarpDatum> TimeWarpData { get; } = new List<TimeWarpDatum>();

    [JsonIgnore] public virtual ICollection<TimeWarpDataDay> TimeWarpDataDays { get; } = new List<TimeWarpDataDay>();

    [JsonIgnore] public virtual ICollection<TimeWarpDataHour> TimeWarpDataHours { get; } = new List<TimeWarpDataHour>();

    [JsonIgnore] public virtual ICollection<TimeWarpDataMinute> TimeWarpDataMinutes { get; } = new List<TimeWarpDataMinute>();

    [JsonIgnore] public virtual ICollection<TimeWarpDataWeek> TimeWarpDataWeeks { get; } = new List<TimeWarpDataWeek>();

    [JsonIgnore] public virtual ICollection<TpsandGasDataAll> TpsandGasDataAlls { get; } = new List<TpsandGasDataAll>();

    [JsonIgnore] public virtual ICollection<TpsandGasDataDay> TpsandGasDataDays { get; } = new List<TpsandGasDataDay>();

    [JsonIgnore] public virtual ICollection<TpsandGasDataHour> TpsandGasDataHours { get; } = new List<TpsandGasDataHour>();

    [JsonIgnore] public virtual TpsandGasDataLatest TpsandGasDataLatest { get; set; }

    [JsonIgnore] public virtual TpsandGasDataMax TpsandGasDataMax { get; set; }

    [JsonIgnore] public virtual ICollection<TpsandGasDataMonth> TpsandGasDataMonths { get; } = new List<TpsandGasDataMonth>();

    [JsonIgnore] public virtual ICollection<TpsandGasDataWeek> TpsandGasDataWeeks { get; } = new List<TpsandGasDataWeek>();

    [JsonIgnore] public virtual ICollection<TpsandGasDataYear> TpsandGasDataYears { get; } = new List<TpsandGasDataYear>();

    [JsonIgnore] public virtual ProviderType TypeNavigation { get; set; }
}
