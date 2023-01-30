using System;
using System.Collections.Generic;

namespace ETHTPS.Data.Database;

public partial class ProviderDetailsMarkdownPage
{
    public int Id { get; set; }

    public int ProviderId { get; set; }

    public int MarkdownPageId { get; set; }

    public virtual MarkdownPage MarkdownPage { get; set; }

    public virtual Provider Provider { get; set; }
}
