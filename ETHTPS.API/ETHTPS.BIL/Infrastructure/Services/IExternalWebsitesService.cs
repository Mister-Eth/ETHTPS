using ETHTPS.Data.Core.Models.ExternalWebsites;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IExternalWebsitesService
    {
        public IEnumerable<IProviderExternalWebsite> GetExternalWebsitesFor(string providerName);
    }
    public interface IExternalWebsitesService<TExternalWebsite> : ICRUDService<TExternalWebsite>, IExternalWebsitesService
        where TExternalWebsite : IExternalWebsite
    {
    }
}
