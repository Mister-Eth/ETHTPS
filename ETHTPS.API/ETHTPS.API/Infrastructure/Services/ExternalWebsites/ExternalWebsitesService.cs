using ETHTPS.Data.Database;
using ETHTPS.Data.Extensions.StringExtensions;
using ETHTPS.Data.ResponseModels.SocialMedia;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;

namespace ETHTPS.API.Infrastructure.Services.ExternalWebsites
{
    public class ExternalWebsitesService : EFCoreCRUDServiceBase<ExternalWebsite>, IExternalWebsitesService
    {
        private readonly EthtpsContext _context;
        public ExternalWebsitesService(EthtpsContext context) : base(context.ExternalWebsites, context)
        {
            _context = context;
        }

        public IEnumerable<ProviderExternalWebsite> GetExternalWebsitesFor(string providerName)
        {
            lock (_context.LockObj)
            {
                var links = _context.ProviderLinks.ToList()
                    .Where(x => x.Provider.Name.LossyCompareTo(providerName));
                return links
                    .Select(link => new ProviderExternalWebsite()
                    {
                        Category = link.ExternalWebsite.CategoryNavigation.Name,
                        WebsiteName = link.ExternalWebsite.Name,
                        IconBase64 = (link.ExternalWebsite.IconBase64.Length == 0)?null: link.ExternalWebsite.IconBase64,
                        Url = link.Link
                    });
            }
        }
    }
}
