using Newtonsoft.Json;

using System;
using System.Collections.Generic;

#nullable disable

namespace ETHTPS.Data.Database
{
    public partial class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Type { get; set; }

        [JsonIgnore]
        public virtual ProviderType TypeNavigation { get; set; }
    }
}
