using ETHTPS.Data.Database;
using ETHTPS.Data.ResponseModels.SocialMedia;
using System.Collections.Generic;

namespace ETHTPS.API.Infrastructure.Services.ExternalWebsites
{
    public interface IExternalWebsitesService : ICRUDService<ExternalWebsite>
    {
        public IEnumerable<ExternalWebsite> GetExternalWebsitesFor(string providerName);
    }
}
