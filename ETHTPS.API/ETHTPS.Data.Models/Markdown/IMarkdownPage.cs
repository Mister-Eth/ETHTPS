using ETHTPS.Data.Core;

namespace ETHTPS.Data.Models.Markdown
{
    public interface IMarkdownPage : IIndexed
    {
        public string RawMarkdown { get; set; }
    }
}
