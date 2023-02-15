using ETHTPS.Data.Core.Models.Markdown;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IMarkdownService
    {
        public IEnumerable<IMarkdownPage> GetMarkdownPagesFor(string providerName);
    }
    public interface IMarkdownService<TMarkdownPage> : ICRUDService<TMarkdownPage>, IMarkdownService
        where TMarkdownPage : IMarkdownPage
    {
    }
}
