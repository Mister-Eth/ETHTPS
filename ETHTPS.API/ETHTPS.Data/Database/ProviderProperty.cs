using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class ProviderProperty
    {
        public int Id { get; set; }
        public int Provider { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public virtual Provider ProviderNavigation { get; set; }
    }
}
