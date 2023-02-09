using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Integrations.MSSQL.Temp;

public partial class ProviderDetailsMarkdownPage
{
    public int Id { get; set; }

    public int ProviderId { get; set; }

    public int MarkdownPageId { get; set; }

    public virtual MarkdownPage MarkdownPage { get; set; } = null!;

    public virtual Provider Provider { get; set; } = null!;
}
