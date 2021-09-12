using Newtonsoft.Json;

using System;
using System.Collections.Generic;
#nullable disable

namespace ETHTPS.API.Infrastructure.Database.Models
{
    public partial class ProviderType
    {
        public ProviderType()
        {
            Providers = new HashSet<Provider>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Provider> Providers { get; set; }
    }
}
