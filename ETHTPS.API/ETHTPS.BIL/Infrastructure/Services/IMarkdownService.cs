using ETHTPS.Data.Integrations.MSSQL;

using System.Collections.Generic;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IMarkdownService : ICRUDService<MarkdownPage>
    {
        public IEnumerable<MarkdownPage> GetMarkdownPagesFor(string providerName);
    }
}
