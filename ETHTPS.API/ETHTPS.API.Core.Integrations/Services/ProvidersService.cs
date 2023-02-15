using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.Data.Integrations.MSSQL;
using ETHTPS.Data.Core.Models.Providers;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class ProvidersService : EFCoreCRUDServiceBase<Provider>, IProvidersService<Provider>
    {
        public ProvidersService(EthtpsContext context) : base(context.Providers, context)
        {
        }
    }
}
