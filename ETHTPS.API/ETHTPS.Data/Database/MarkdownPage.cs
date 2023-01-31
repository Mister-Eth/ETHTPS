using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class MarkdownPage : EntityWIthId
{
    public string RawMarkdown { get; set; }

    public virtual ICollection<ProviderDetailsMarkdownPage> ProviderDetailsMarkdownPages { get; } = new List<ProviderDetailsMarkdownPage>();
}
