using ETHTPS.Data.Core;
using ETHTPS.Data.Models;
using ETHTPS.Data.Models.Markdown;

namespace ETHTPS.Data.Integrations.MSSQL;

public partial class MarkdownPage : IMarkdownPage
{
    public virtual ICollection<ProviderDetailsMarkdownPage> ProviderDetailsMarkdownPages { get; } = new List<ProviderDetailsMarkdownPage>();
    public string RawMarkdown { get; set; }
    public int Id { get; set; }
}
