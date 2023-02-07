using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.ResponseModels.SocialMedia;
using System.Collections.Generic;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IExternalWebsitesService : ICRUDService<ExternalWebsite>
    {
        public IEnumerable<ProviderExternalWebsite> GetExternalWebsitesFor(string providerName);
    }
}
