using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Provider
    {
        public Provider()
        {
            ProviderProperties = new HashSet<ProviderProperty>();
            TpsandGasDataDays = new HashSet<TpsandGasDataDay>();
            TpsandGasDataHours = new HashSet<TpsandGasDataHour>();
            TpsandGasDataLatests = new HashSet<TpsandGasDataLatest>();
            TpsandGasDataMaxes = new HashSet<TpsandGasDataMax>();
            TpsandGasDataMonths = new HashSet<TpsandGasDataMonth>();
            TpsandGasDataWeeks = new HashSet<TpsandGasDataWeek>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }

        public virtual ProviderType TypeNavigation { get; set; }
        public virtual ICollection<ProviderProperty> ProviderProperties { get; set; }
        public virtual ICollection<TpsandGasDataDay> TpsandGasDataDays { get; set; }
        public virtual ICollection<TpsandGasDataHour> TpsandGasDataHours { get; set; }
        public virtual ICollection<TpsandGasDataLatest> TpsandGasDataLatests { get; set; }
        public virtual ICollection<TpsandGasDataMax> TpsandGasDataMaxes { get; set; }
        public virtual ICollection<TpsandGasDataMonth> TpsandGasDataMonths { get; set; }
        public virtual ICollection<TpsandGasDataWeek> TpsandGasDataWeeks { get; set; }
    }
}
