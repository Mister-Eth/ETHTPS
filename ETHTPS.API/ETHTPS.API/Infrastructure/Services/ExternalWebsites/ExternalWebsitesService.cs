using ETHTPS.Data.Database;
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

        public IEnumerable<ExternalWebsite> GetExternalWebsitesFor(string providerName)
        {
            lock (_context.LockObj)
            {
                var linkProviders = _context.ProviderLinks.Where(x => x.Provider.Name == providerName).ToList().Select(x => x.ProviderId).Distinct();
                return _context.ExternalWebsites.Where(x => linkProviders.Contains(x.Id
                    ));
            }
        }
    }
}
