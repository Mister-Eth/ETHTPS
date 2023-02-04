using ETHTPS.Data.Database;

using System.Collections.Generic;

namespace ETHTPS.API.Core.Infrastructure.Services.Markdown
{
    public interface IMarkdownService : ICRUDService<MarkdownPage>
    {
        public IEnumerable<MarkdownPage> GetMarkdownPagesFor(string providerName);
    }
}
