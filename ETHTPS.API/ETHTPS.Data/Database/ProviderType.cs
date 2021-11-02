using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class ProviderType
    {
        public ProviderType()
        {
            Providers = new HashSet<Provider>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Provider> Providers { get; set; }
    }
}
