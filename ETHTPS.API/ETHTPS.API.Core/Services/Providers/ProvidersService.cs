using ETHTPS.Data.Integrations.MSSQL;

using Microsoft.EntityFrameworkCore;

using System;

namespace ETHTPS.API.Core.Infrastructure.Services.Markdown
{
    public class ProvidersService : EFCoreCRUDServiceBase<Provider>, IProvidersService
    {
        public ProvidersService(EthtpsContext context) : base(context.Providers, context)
        {
        }
    }
}
