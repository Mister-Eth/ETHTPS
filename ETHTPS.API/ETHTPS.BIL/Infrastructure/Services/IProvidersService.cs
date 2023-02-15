using ETHTPS.Data.Core.Models.Providers;

namespace ETHTPS.API.BIL.Infrastructure.Services
{
    public interface IProvidersService { }
    public interface IProvidersService<TProvider> : ICRUDService<TProvider>, IProvidersService
        where TProvider : IProvider
    {

    }
}
