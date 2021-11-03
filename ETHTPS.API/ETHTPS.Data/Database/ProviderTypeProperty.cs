using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class ProviderTypeProperty
    {
        public int Id { get; set; }
        public int ProviderType { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public virtual ProviderType ProviderTypeNavigation { get; set; }
    }
}
