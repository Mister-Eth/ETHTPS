using ETHTPS.Data.Models;

using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class MarkdownPage : EntityWIthId
{
    public string RawMarkdown { get; set; }

    public virtual ICollection<ProviderDetailsMarkdownPage> ProviderDetailsMarkdownPages { get; } = new List<ProviderDetailsMarkdownPage>();
}
