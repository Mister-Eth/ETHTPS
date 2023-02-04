using ETHTPS.Data.Database;

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
