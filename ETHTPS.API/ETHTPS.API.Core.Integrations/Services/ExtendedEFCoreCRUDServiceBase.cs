using ETHTPS.Data.Integrations.MSSQL;
using Microsoft.EntityFrameworkCore;
using ETHTPS.API.BIL.Infrastructure.Services;
using ETHTPS.Data.Core;

namespace ETHTPS.API.Core.Integrations.MSSQL.Services
{
    public abstract class ExtendedEFCoreCRUDServiceBase<TService, TEntity, TReturn> : EFCoreCRUDServiceBase<TEntity>
        where TEntity : class, IIndexed
        where TService : ICRUDService<TEntity>
    {
        protected ExtendedEFCoreCRUDServiceBase(DbSet<TEntity> entitySet, EthtpsContext context) : base(entitySet, context)
        {
        }
    }
}
