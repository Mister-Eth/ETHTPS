using ETHTPS.Data.ResponseModels.SocialMedia;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class ExternalWebsite : ExternalWebsiteBase
{
    public virtual ExternalWebsiteCateopry CategoryNavigation { get; set; }

    [JsonIgnore]
    public virtual ICollection<ProviderLink> ProviderLinks { get; } = new List<ProviderLink>();
}
