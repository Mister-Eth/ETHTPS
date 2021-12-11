using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Provider
    {
        public Provider()
        {
            OldestLoggedHistoricalEntries = new HashSet<OldestLoggedHistoricalEntry>();
            OldestLoggedTimeWarpBlocks = new HashSet<OldestLoggedTimeWarpBlock>();
            TimeWarpData = new HashSet<TimeWarpDatum>();
            TimeWarpDataDays = new HashSet<TimeWarpDataDay>();
            TimeWarpDataHours = new HashSet<TimeWarpDataHour>();
            TimeWarpDataMinutes = new HashSet<TimeWarpDataMinute>();
            TimeWarpDataWeeks = new HashSet<TimeWarpDataWeek>();
            TpsandGasDataAlls = new HashSet<TpsandGasDataAll>();
            TpsandGasDataDays = new HashSet<TpsandGasDataDay>();
            TpsandGasDataHours = new HashSet<TpsandGasDataHour>();
            TpsandGasDataLatests = new HashSet<TpsandGasDataLatest>();
            TpsandGasDataMaxes = new HashSet<TpsandGasDataMax>();
            TpsandGasDataMonths = new HashSet<TpsandGasDataMonth>();
            TpsandGasDataWeeks = new HashSet<TpsandGasDataWeek>();
            TpsandGasDataYears = new HashSet<TpsandGasDataYear>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public string Color { get; set; }
        public int TheoreticalMaxTps { get; set; }
        public int? IsGeneralPurpose { get; set; }
        public int? HistoricalAggregationDeltaBlock { get; set; }
        public bool Enabled { get; set; }

        public virtual ProviderType TypeNavigation { get; set; }
        public virtual ICollection<OldestLoggedHistoricalEntry> OldestLoggedHistoricalEntries { get; set; }
        public virtual ICollection<OldestLoggedTimeWarpBlock> OldestLoggedTimeWarpBlocks { get; set; }
        public virtual ICollection<TimeWarpDatum> TimeWarpData { get; set; }
        public virtual ICollection<TimeWarpDataDay> TimeWarpDataDays { get; set; }
        public virtual ICollection<TimeWarpDataHour> TimeWarpDataHours { get; set; }
        public virtual ICollection<TimeWarpDataMinute> TimeWarpDataMinutes { get; set; }
        public virtual ICollection<TimeWarpDataWeek> TimeWarpDataWeeks { get; set; }
        public virtual ICollection<TpsandGasDataAll> TpsandGasDataAlls { get; set; }
        public virtual ICollection<TpsandGasDataDay> TpsandGasDataDays { get; set; }
        public virtual ICollection<TpsandGasDataHour> TpsandGasDataHours { get; set; }
        public virtual ICollection<TpsandGasDataLatest> TpsandGasDataLatests { get; set; }
        public virtual ICollection<TpsandGasDataMax> TpsandGasDataMaxes { get; set; }
        public virtual ICollection<TpsandGasDataMonth> TpsandGasDataMonths { get; set; }
        public virtual ICollection<TpsandGasDataWeek> TpsandGasDataWeeks { get; set; }
        public virtual ICollection<TpsandGasDataYear> TpsandGasDataYears { get; set; }
    }
}
