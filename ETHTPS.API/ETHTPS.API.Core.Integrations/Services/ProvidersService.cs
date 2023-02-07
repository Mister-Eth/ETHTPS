using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.Data.Integrations.MSSQL;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public class ProvidersService : EFCoreCRUDServiceBase<Provider>, IProvidersService
    {
        public ProvidersService(EthtpsContext context) : base(context.Providers, context)
        {
        }
    }
}
