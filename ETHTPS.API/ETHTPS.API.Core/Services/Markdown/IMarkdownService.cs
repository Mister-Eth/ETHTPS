using ETHTPS.Data.Integrations.MSSQL;

using System.Collections.Generic;

namespace ETHTPS.API.Core.Infrastructure.Services.Markdown
{
    public interface IMarkdownService : ICRUDService<MarkdownPage>
    {
        public IEnumerable<MarkdownPage> GetMarkdownPagesFor(string providerName);
    }
}
