using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models.Markdown;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class MarkdownService : EFCoreCRUDServiceBase<MarkdownPage>, IMarkdownService<MarkdownPage>
    {
        private readonly EthtpsContext _context;
        public MarkdownService(EthtpsContext context) : base(context.MarkdownPages, context)
        {
            _context = context;
        }

        public IEnumerable<IMarkdownPage> GetMarkdownPagesFor(string providerName)
        {
            return _context.ProviderDetailsMarkdownPages?.ToList()?.Where(x => x.Provider.Name.LossyCompareTo(providerName)).Select(x => x.MarkdownPage);
        }
    }
}
