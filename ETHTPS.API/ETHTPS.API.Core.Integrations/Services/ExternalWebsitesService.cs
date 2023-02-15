using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels.SocialMedia;
using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.Data.Core.Models.ExternalWebsites;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class ExternalWebsitesService : EFCoreCRUDServiceBase<ExternalWebsite>, IExternalWebsitesService<ExternalWebsite>
    {
        private readonly EthtpsContext _context;
        public ExternalWebsitesService(EthtpsContext context) : base(context.ExternalWebsites, context)
        {
            _context = context;
        }

        public IEnumerable<IProviderExternalWebsite> GetExternalWebsitesFor(string providerName)
        {
            lock (_context.LockObj)
            {
                var links = _context.ProviderLinks.ToList()
                    .Where(x => x.Provider.Name.LossyCompareTo(providerName));
                return links
                    .Select(link => new ProviderExternalWebsite()
                    {
                        Category = link.ExternalWebsite.CategoryNavigation.Id,
                        Name = link.ExternalWebsite.Name,
                        IconBase64 = (link.ExternalWebsite.IconBase64.Length == 0) ? null : link.ExternalWebsite.IconBase64,
                        Url = link.Link
                    });
            }
        }
    }
}
