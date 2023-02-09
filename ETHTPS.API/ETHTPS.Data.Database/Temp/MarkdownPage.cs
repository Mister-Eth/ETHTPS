using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class MarkdownPage
{
    public int Id { get; set; }

    public string RawMarkdown { get; set; } = null!;

    public virtual ICollection<ProviderDetailsMarkdownPage> ProviderDetailsMarkdownPages { get; } = new List<ProviderDetailsMarkdownPage>();
}
